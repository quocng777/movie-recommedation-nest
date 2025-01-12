import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'people' }) 
export class People extends Document {
  @Prop({ type: Number, required: true })
  tmdb_id: number; 

  @Prop({ type: Boolean, required: true })
  adult: boolean;

  @Prop({ type: [String], default: [] })
  also_known_as: string[];

  @Prop({ type: String })
  biography: string; 

  @Prop({ type: String })
  birthday: string; 

  @Prop({ type: String, default: null })
  deathday: string | null; 

  @Prop({ type: Number })
  gender: number; 

  @Prop({ type: String })
  homepage: string; 

  @Prop({ type: Number, required: true })
  id: number; 

  @Prop({ type: String })
  imdb_id: string; 

  @Prop({ type: String })
  known_for_department: string; 

  @Prop({ type: String, required: true })
  name: string; 

  @Prop({ type: String })
  place_of_birth: string; 

  @Prop({ type: Number })
  popularity: number;

  @Prop({ type: String })
  profile_path: string; 

  @Prop({ type: Object, default: {} })
  movie_credits: {
    cast: { id: number; [key: string]: any }[]; 
    crew: { id: number; [key: string]: any }[]; 
    id: string;
  };
}

export const PeopleSchema = SchemaFactory.createForClass(People);
