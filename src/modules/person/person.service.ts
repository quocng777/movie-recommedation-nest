import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonService {
  

  findAll() {
    return `This action returns all people`;
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

 

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
