import { HttpService } from "@nestjs/axios";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";

@Injectable()
export class HttpClient {
    constructor(private readonly httpService: HttpService) { 
    }

    async get<T>({url, params}: {url: string, params?: any}): Promise<T> {
        const { data } = await firstValueFrom(
            this.httpService.get<T>(url, {params}).pipe(
                catchError((error: AxiosError) => {
                    console.error(error);
                    throw new InternalServerErrorException();
                }),
            ),
        );
        return data;
    }
};