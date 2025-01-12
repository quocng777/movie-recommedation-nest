import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { People } from './schemas/people.schema';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel(People.name) private readonly peopleModel: Model<People>,
  ) {}


  async findAll(): Promise<People[]> {
   
    return await this.peopleModel.find().exec();
  }

  async findOne(id: string): Promise<People> {
    return await this.peopleModel.findById(id).exec();
  }

}
