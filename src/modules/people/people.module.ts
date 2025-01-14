import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PeopleSchema } from './schemas/people.schema';
import { PeopleService } from './people.service';
@Module({
    imports: [ 
        MongooseModule.forFeature([ { name: "people", schema: PeopleSchema }])
        
      ],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
