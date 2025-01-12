import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieGenresService } from './movie-genres.service';
import { MovieGenresController } from './movie-genres.controller';
import { MovieGenre, MovieGenreSchema } from './schemas/movie-genre.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MovieGenre.name, schema: MovieGenreSchema }]),
  ],
  controllers: [MovieGenresController],
  providers: [MovieGenresService],
})
export class MovieGenresModule {}
