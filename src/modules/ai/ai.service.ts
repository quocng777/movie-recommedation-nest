import { LlmHttpConfigService } from "@/config/llm-http.config";
import { HttpService } from "@nestjs/axios";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { InjectModel } from "@nestjs/mongoose";
import { IMovie } from "../movies/schemas/movie.schema";
import { IGenre } from "../movies/schemas/genre.schema";
import { Model } from "mongoose";
import { NavigationResponse, NavigationRoute } from "./interfaces/navigation-response.interface";

@Injectable()
export class AiService {
  private readonly llmApiKey: string;
  constructor(private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectModel("movies") private movieModel: Model<IMovie>,
    @InjectModel("genres") private genreModel: Model<IGenre>
  ) {
    this.llmApiKey = configService.get('LLM_API_KEY');
  }

  async navigate(query: string) {
    const res = this
      .httpService
      .post<NavigationResponse>(`/navigate/?llm_api_key=${this.llmApiKey}&query=${query}`, {
        headers: {
          Accept: 'application/json'
        }
      })
      .pipe(
        catchError((error: AxiosError) => {
          console.error(error);
          throw new InternalServerErrorException();
        }),
      );

    const { data } = await firstValueFrom(res);

    if(data.data.route === NavigationRoute.CAST_PAGE && data.data.params) {
      const movies = await this.movieModel.find({ _id: { $in: data.data.params.movie_ids } });
      
      if (movies.length === 0) {
        data.data.route = NavigationRoute.NONE;
        data.data.params = null;
      } else {
        data.data.params = movies.map((movie: IMovie) => {
          return movie.tmdb_id;
        });
      }

    } else if (data.data.route === NavigationRoute.MOVIE_PAGE && data.data.params) {
      const movies = await this.movieModel.find({ _id: { $in: data.data.params.movie_ids } });
      
      if (movies.length === 0) {
        data.data.route = NavigationRoute.NONE;
        data.data.params = null;
      } else {
        data.data.params = movies.map((movie: IMovie) => {
          return movie.tmdb_id;
        });
      }

    } else if (data.data.route === NavigationRoute.GENRE_PAGE && data.data.params) {
      const genres = await this.genreModel.find({ _id: { $in: data.data.params.genre_ids } });

      if (genres.length === 0) {
        data.data.route = NavigationRoute.NONE;
        data.data.params = null;
      } else {
        data.data.params = genres.map((genre: IGenre) => {
          return genre.tmdb_id;
        });
      }
    } else if (!data.data.params) {
      data.data.route = NavigationRoute.NONE;
    }

    return data.data;
  }

  async retrieveMovies(collectionName: string, query: string, amount: number = 10, threshold: number = 0.25) {
    const url = `https://awd-llm.azurewebsites.net/retriever/`;
    const params = {
      llm_api_key: this.llmApiKey,
      collection_name: collectionName,
      query,
      amount,
      threshold,
    };
  
    try {
      
      const res = this.httpService.get(url, { params }).pipe(
        catchError((error: AxiosError) => {
          console.error('Error retrieving movies:', error.message);
          throw new InternalServerErrorException('Failed to retrieve movies');
        }),
      );
      const { data } = await firstValueFrom(res);

      return data; 
    } catch (error) {
      console.error('Error in retrieveMovies:', error);
      throw new InternalServerErrorException('Failed to process retrieveMovies');
    }
  }
  
}