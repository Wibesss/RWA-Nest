import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameRatingModel } from '../Store/types/gamerating.module';

@Injectable({
  providedIn: 'root',
})
export class GameRatingService {
  
  constructor(private http: HttpClient) {}

  postGameRating(
    gameRating: GameRatingModel,
    gameId: number,
    userId: number
  ): Observable<GameRatingModel[]> {
    console.log(gameRating);
    return this.http.post<GameRatingModel[]>(
      `http://localhost:3000/rating/addRatingToGame/${gameId}/${userId}`,
      gameRating,
      {
        withCredentials: true,
      }
    );
  }
}
