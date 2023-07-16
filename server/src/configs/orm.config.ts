import { ArticleEntity } from '@app/article/entities/article.entity';
import { FollowEntity } from '@app/profile/entities/follow.entity';
import { TagEntity } from '@app/tag/entities/tag.entity';
import { UserEntity } from '@app/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [TagEntity, UserEntity, ArticleEntity, FollowEntity],
  synchronize: true,
  //migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
});
