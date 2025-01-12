import { Controller, Get, Query } from "@nestjs/common";
import { AiService } from "./ai.service";

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('/navigate')
  async getAiNavigation(@Query('query') query: string) {
    return this.aiService.navigate(query);
  } 
}