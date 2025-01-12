import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MovieGenresService } from './movie-genres.service';
import { MovieGenre } from './schemas/movie-genre.schema';

@Controller('movie-genres')
export class MovieGenresController {
  constructor(private readonly movieGenresService: MovieGenresService) {}


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieGenresService.findOne(id);
  }
  @Get()
  findAll() {
    return this.movieGenresService.findAll();
  }

 


}
