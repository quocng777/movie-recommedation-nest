import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieGenre } from './schemas/movie-genre.schema';

@Injectable()
export class MovieGenresService {
  constructor(
    @InjectModel(MovieGenre.name) private readonly movieGenreModel: Model<MovieGenre>,
  ) {}

  async create(movieGenre: MovieGenre): Promise<MovieGenre> {
    const newGenre = new this.movieGenreModel(movieGenre);
    return newGenre.save();
  }

  async findAll(): Promise<MovieGenre[]> {
    return this.movieGenreModel.find().exec();
  }

  async findOne(id: string): Promise<MovieGenre> {
    return this.movieGenreModel.findById(id).exec();
  }

  
}
