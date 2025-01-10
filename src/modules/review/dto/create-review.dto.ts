import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReviewDto {
  @IsInt()
  @IsNotEmpty()
  movieId: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
