import { Module } from '@nestjs/common';
import { MoviesTrendingService } from './movies-trending.service';
import { MoviesTrendingController } from './movies-trending.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieTrendingSchema } from './schemas/movie-trending.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'movies_treding', schema: MovieTrendingSchema },
    ]),
  ],

  controllers: [MoviesTrendingController],
  providers: [MoviesTrendingService],
})
export class MoviesTrendingModule {}
