import { Schema, Document , Types} from 'mongoose';

export interface Genre extends Document {
  name: string;
  movies: Types.Array<string>; 
}

export const GenreSchema = new Schema<Genre>({
  name: { type: String, required: true },
  movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
});
