import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Game, GameModel } from '../Store/types/game.module';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class GameService {
  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllGames(): Observable<Game[]> {
    const cookieValue = this.cookieService.get('jwt');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${cookieValue}`,
      }),
      withCredentials: true,
    };

    return this.http.get<Game[]>(
      `${this.API_URL}/game/getAllGames`,
      httpOptions
    );
  }

  getGameById(gameId: number): Observable<Game> {
    return this.http.get<Game>(`${this.API_URL}/game/getGameById/${gameId}`, {
      withCredentials: true,
    });
  }
  addGameToUser(userId: number, gameId: number): Observable<Game> {
    return this.http.post<Game>(
      `${this.API_URL}/user/addGameToUser/${userId}/${gameId}`,
      { withCredentials: true }
    );
  }
  getGamesForDeveloper(developerId: number): Observable<Game[]> {
    return this.http.get<Game[]>(
      `${this.API_URL}/game/getGamesByDeveloper/${developerId}`,
      {
        withCredentials: true,
      }
    );
  }

  postGame(game: GameModel, id: number): Observable<Game[]> {
    const gameData = {
      title: game.title,
      photoURL: game.photoURL,
    };

    return this.http.post<Game[]>(
      `${this.API_URL}/game/addGame/${id}`,
      gameData,
      {
        withCredentials: true,
      }
    );
  }

  getGamesForUser(userId: number): Observable<Game[]> {
    return this.http.get<Game[]>(
      `${this.API_URL}/user/getGamesforUser/${userId}`,
      {
        withCredentials: true,
      }
    );
  }

  // updateAnime(anime: Anime): Observable<Anime> {
  //   return this.http.put<Anime>(
  //     ` http://localhost:3000/anime/updateAnime`,
  //     anime,
  //     {
  //       withCredentials: true,
  //     }
  //   );
  // }
}
