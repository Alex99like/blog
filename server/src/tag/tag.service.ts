import { Injectable } from '@nestjs/common';
import { TagEntity } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '@app/article/entities/article.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}
  async findAll(): Promise<string[]> {
    const articles = await this.articleRepository.find();
    const tags = new Set(articles.flatMap((tag) => [...tag.tagList])); //map((tag) => [...tag.tagList])
    return Array.from(tags);
  }
}
