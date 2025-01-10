import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpCode, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from '@/guards/auth.guard';
import { UserDto } from '@/modules/user/dto/user.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Req() req, @Body() createReviewDto: CreateReviewDto) {
    const user = req.user as UserDto;
    const { movieId, comment } = createReviewDto;
    return this.reviewService.create(user.id, movieId, comment);
  }

  @Get('/:id')
  async findById(@Param('id') id: number) {
    return this.reviewService.getReviewById(id);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto) {
    const user = req.user as UserDto;
    const { comment } = updateReviewDto;
    return this.reviewService.updateReview(id, user.id, comment);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: number) {
    const user = req.user as UserDto;
    return this.reviewService.deleteReview(id, user.id);
  }

  @Get('/movie/:movieId')
  async getReviewsByMovie(@Param('movieId') movieId: number) {
    return this.reviewService.getReviewsByMovie(movieId);
  }
}
