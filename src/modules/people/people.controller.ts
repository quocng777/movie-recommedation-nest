import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.peopleService.findOne(id);
  }
  @Get()
  findAll() {
    return this.peopleService.findAll();
  }

  
}
