import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const mongooseConfig = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/movie_db',
};
 