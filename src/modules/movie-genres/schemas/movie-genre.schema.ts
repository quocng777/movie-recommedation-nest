import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'movie_genres' }) 
export class MovieGenre extends Document {

  @Prop({ type: Number, required: true })
  tmdb_id: number;

  @Prop({ type: Number, required: true })
  id: number;

  @Prop({ type: String, required: true })
  name: string;
}

export const MovieGenreSchema = SchemaFactory.createForClass(MovieGenre);
