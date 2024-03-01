import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GameReview } from '../Store/types/gamereview.module';

@Injectable({
  providedIn: 'root',
})
export class GameReviewService {
  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  postGameReview(
    gameReview: GameReview,
    gameId: number,
    userId: number
  ): Observable<GameReview[]> {
    const gameReviewData = {
      review: gameReview.review,
    };

    return this.http.post<GameReview[]>(
      `${this.API_URL}/review/addReviewToGame/${gameId}/${userId}`,
      gameReviewData,
      {
        withCredentials: true,
      }
    );
  }

  getAllReviewsForGameById(gameId: number): Observable<GameReview[]> {
    return this.http.get<GameReview[]>(
      `${this.API_URL}/review/getAllReviewsForGameById/${gameId}`,
      {
        withCredentials: true,
      }
    );
  }
  deleteReviewById(reviewId: number) {
    return this.http.delete<number>(
      `${this.API_URL}/review/deleteReviewById/${reviewId}`,
      {
        withCredentials: true,
      }
    );
  }
}
