import { Module } from '@nestjs/common';
import { MoviesTrendingService } from './movies-trending.service';
import { MoviesTrendingController } from './movies-trending.controller';

@Module({
  controllers: [MoviesTrendingController],
  providers: [MoviesTrendingService],
})
export class MoviesTrendingModule {}
