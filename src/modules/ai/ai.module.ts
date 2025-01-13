import { Module } from "@nestjs/common";
import { AiController } from "./ai.controller";
import { AiService } from "./ai.service";
import { HttpModule } from "@nestjs/axios";
import { LlmHttpConfigService } from "@/config/llm-http.config";
import { MongooseModule } from "@nestjs/mongoose";
import { MovieModel, MovieSchema } from "../movies/schemas/movie.schema";

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: LlmHttpConfigService,
    }),
    MongooseModule.forFeature([{schema: MovieSchema, name: "movies"}])
  ],
  controllers: [AiController],
  providers: [AiService]
})
export class AiModule {}