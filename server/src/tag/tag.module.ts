import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { ArticleEntity } from '@app/article/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, ArticleEntity])],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
