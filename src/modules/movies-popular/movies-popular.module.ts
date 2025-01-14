import { Module } from '@nestjs/common';
import { MoviesPopularService } from './movies-popular.service';
import { MoviesPopularController } from './movies-popular.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviePopularSchema } from './schemas/movie-popular.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'movies_popular', schema: MoviePopularSchema },
    ]),
  ],
  controllers: [MoviesPopularController],
  providers: [MoviesPopularService],
})
export class MoviesPopularModule {}
