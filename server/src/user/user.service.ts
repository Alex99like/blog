import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/configs/config';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const errorResponse = {
      errors: {},
    };
    console.log(createUserDto);
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (userByEmail) {
      errorResponse.errors['email'] = 'has already been token';
    }

    if (userByUsername) {
      errorResponse.errors['username'] = 'has already been token';
    }

    if (userByEmail || userByUsername) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const errorResponse = {
      errors: {
        'email or password': 'is invalid',
      },
    };

    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['id', 'bio', 'email', 'image', 'username', 'password'],
    });

    if (!user) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    delete user.password;

    return user;
  }

  async findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findById(userId);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
