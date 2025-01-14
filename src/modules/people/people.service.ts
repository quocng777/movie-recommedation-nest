import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPeople, PeopleModel } from './schemas/people.schema';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel("people") private readonly movieModel: Model<IPeople>
  ) {}

  findAll() {
    return this.movieModel.find().exec(); 
  }

  async findOne(id: string) {
    const person = await this.movieModel.findOne({ tmdb_id: id }).exec();
    console.log(person); 
    return person;
  }
}
