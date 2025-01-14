import { Injectable } from '@nestjs/common';


@Injectable()
export class MoviesPopularService {
  
  findAll() {
    return `This action returns all moviesPopular`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moviesPopular`;
  }

}
