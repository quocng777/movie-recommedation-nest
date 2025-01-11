import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Review from '../movies/entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  create(userId: number, movieId: number, comment: string): Promise<Review> {
    const newReview = this.reviewRepository.create({
      user: { id: userId },
      movie_id: movieId,
      comment,
    });

    return this.reviewRepository.save(newReview);
  }

  async getReviewsByMovie(movieId: number): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { movie_id: movieId },
      relations: ['user'],
      order: { created_at: 'DESC' },
    });
  }

  async getReviewById(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async updateReview(
    id: number,
    userId: number,
    comment: string,
  ): Promise<Review> {
    const review = await this.getReviewById(id);

    if (review.user.id !== userId) {
      throw new NotFoundException('You can only edit your own reviews');
    }

    review.comment = comment;
    return this.reviewRepository.save(review);
  }

  async deleteReview(id: number, userId: number): Promise<number> {
    const review = await this.getReviewById(id);

    if (review.user.id !== userId) {
      throw new NotFoundException('You can only delete your own reviews');
    }

    await this.reviewRepository.remove(review);
    return id;
  }
}
