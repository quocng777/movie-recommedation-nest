import { Module } from "@nestjs/common";
import { AiController } from "./ai.controller";
import { AiService } from "./ai.service";
import { HttpModule } from "@nestjs/axios";
import { LlmHttpConfigService } from "@/config/llm-http.config";

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: LlmHttpConfigService,
    })
  ],
  controllers: [AiController],
  providers: [AiService]
})
export class AiModule {}