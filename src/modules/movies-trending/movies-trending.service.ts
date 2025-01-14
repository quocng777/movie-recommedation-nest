import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesTrendingService {
  
  findAll() {
    return `This action returns all moviesTrending`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moviesTrending`;
  }

  
 
}
