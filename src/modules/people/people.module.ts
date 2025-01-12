import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { People, PeopleSchema } from './schemas/people.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: People.name, schema: PeopleSchema }]),
  ],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
