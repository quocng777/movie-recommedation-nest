import { Module } from '@nestjs/common';
import { MoviesPopularService } from './movies-popular.service';
import { MoviesPopularController } from './movies-popular.controller';

@Module({
  controllers: [MoviesPopularController],
  providers: [MoviesPopularService],
})
export class MoviesPopularModule {}
