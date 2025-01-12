import { LlmHttpConfigService } from "@/config/llm-http.config";
import { HttpService } from "@nestjs/axios";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, firstValueFrom } from "rxjs";
import { NavigationResponse, NavigationRoute } from "./interfaces/navigation-response.interface";
import { AxiosError } from "axios";

@Injectable()
export class AiService {
  private readonly llmApiKey: string;
  constructor(private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.llmApiKey = configService.get('LLM_API_KEY');
  }

  async navigate(query: string) {
    const body = {
      llm_api_key: this.llmApiKey,
      query,
    };

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
    
    // just for test
    if(data.data.route === NavigationRoute.CAST_PAGE) {
      data.data.params = [
        {
          "backdrop_path": "/dMloNvayweggmvv0UD0iOJIkkbH.jpg",
          "id": 1261501,
          "title": "Ad Vitam",
          "original_title": "Ad Vitam",
          "overview": "When he and his pregnant wife are attacked in their home, a former elite agent becomes trapped in a deadly manhunt tied to his own painful past.",
          "poster_path": "/dOpSxmD3FWfl6SK8SLXw9uwcO05.jpg",
          "media_type": "movie",
          "adult": false,
          "original_language": "fr",
          "genre_ids": [
            53,
            18,
            80,
            28
          ],
          "popularity": 57.677,
          "release_date": "2025-01-09",
          "video": false,
          "vote_average": 5.8,
          "vote_count": 32
        },
        {
          "backdrop_path": "/pqulyfkug9A7TmmRn5zrbRA8TAY.jpg",
          "id": 1255788,
          "title": "The Gardener",
          "original_title": "Le Jardinier",
          "overview": "Every year the Prime Minister has a list of all kinds of troublemakers eliminated in the name of the famous Reason of State. Serge Shuster, Special Adviser to the President of the Republic, finds himself on this list, better known as the Matignon List.  Condemned to certain death and at the heart of an implacable plot and a state secret that also put his family in danger, Serge, his wife and children have only one hope left - their gardener, Léo, who hates it when « slugs » invade his garden... Especially those that want to kill innocent families.",
          "poster_path": "/zvLQXaiHn5g376AuHe8hd0u8tN2.jpg",
          "media_type": "movie",
          "adult": false,
          "original_language": "fr",
          "genre_ids": [
            28,
            35 
          ],
          "popularity": 44.516,
          "release_date": "2025-01-10",
          "video": false,
          "vote_average": 5.071,
          "vote_count": 7
        },
        {
          "backdrop_path": "/uVlUu174iiKhsUGqnOSy46eIIMU.jpg",
          "id": 402431,
          "title": "Wicked",
          "original_title": "Wicked",
          "overview": "In the land of Oz, ostracized and misunderstood green-skinned Elphaba is forced to share a room with the popular aristocrat Glinda at Shiz University, and the two's unlikely friendship is tested as they begin to fulfill their respective destinies as Glinda the Good and the Wicked Witch of the West.",
          "poster_path": "/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg",
          "media_type": "movie",
          "adult": false,
          "original_language": "en",
          "genre_ids": [
            18,
            10749,
            14
          ],
          "popularity": 2123.149,
          "release_date": "2024-11-20",
          "video": false,
          "vote_average": 7.3,
          "vote_count": 1169
        }
      ]
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