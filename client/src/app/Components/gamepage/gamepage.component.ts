import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as GameActions from '../../Store/actions/game.actions';
import * as GameRatingActions from '../../Store/actions/gamerating.actions';
import * as GameReviewActions from '../../Store/actions/gamereview.actions';

import {
  isLoadingSelector,
  errorSelector,
  gameSelector,
} from '../../Store/selectors/game.selectors';

import {
  isLoadingGameReviewSelector,
  errorGameReviewSelector,
  gameReviewSelector,
} from '../../Store/selectors/gamereview.selectors';

import { ActivatedRoute } from '@angular/router';

import {
  gameRatingSelector,
  isLoadingRatingSelector,
  errorRatingSelector,
} from '../../Store/selectors/gamerating.selectors';

import { selectUserFeature } from '../../Store/selectors/user.selectors';
import { GameModel } from 'src/app/Store/types/game.module';
import {
  GameRating,
  GameRatingModel,
} from 'src/app/Store/types/gamerating.module';
import {
  GameReview,
  GameReviewModel,
} from 'src/app/Store/types/gamereview.module';
import { User, UserModel } from 'src/app/Store/types/user.module';
import { GameState } from 'src/app/Store/types/game.interface';
import { GameReviewState } from 'src/app/Store/types/gamereview.interface';
import { GameRatingState } from 'src/app/Store/types/gamerating.interface';

@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.scss'],
})
export class GamepageComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<String | null>;
  game$: Observable<GameModel | null>;

  isLoading1$: Observable<boolean>;
  error1$: Observable<String | null>;
  gameRating$: Observable<GameRating | null>;

  isLoading2$: Observable<boolean>;
  error2$: Observable<String | null>;
  gameReviews$: Observable<GameReview[]>;
  user: User;
  authenticated = true;
  isLoggedIn!: boolean;

  constructor(
    private store: Store<GameState>,
    private store1: Store<GameReviewState>,
    private store2: Store<GameRatingState>,
    private route: ActivatedRoute
  ) {
    this.isLoading$ = this.store.select(isLoadingSelector);
    this.error$ = this.store.select(errorSelector);
    this.game$ = this.store.select(gameSelector);
    this.error2$ = this.store1.select(errorGameReviewSelector);
    this.isLoading2$ = this.store1.select(isLoadingGameReviewSelector);
    this.gameReviews$ = this.store1.select(gameReviewSelector);
    this.error1$ = this.store2.select(errorRatingSelector);
    this.isLoading1$ = this.store2.select(isLoadingRatingSelector);
    this.gameRating$ = this.store2.select(gameRatingSelector);
    this.user = new UserModel();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log(id);
      this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
        this.isLoggedIn = userState.isLoggedIn;
        this.authenticated = userState.isLoggedIn;
        console.log('user is ' + this.authenticated);
      });
      this.store.dispatch(GameActions.getGameById({ id }));
      this.store1.dispatch(GameReviewActions.getGameReviews({ id }));
    });

    const userJson = localStorage.getItem('loggedUser');
    if (userJson != null) {
      const userObject = JSON.parse(userJson);
      this.user = new UserModel(
        userObject.id,
        userObject.role,
        userObject.firstName,
        userObject.lastName,
        userObject.username,
        userObject.password,
        userObject.photoURL
      );
    }
  }

  newGameRating: GameRatingModel = {
    rating: 0,
  };
  newGameReview: GameReviewModel = {
    review: '',
  };

  dodaj(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (
        this.newGameRating &&
        this.newGameRating.rating !== undefined &&
        this.newGameRating.rating >= 1 &&
        this.newGameRating.rating <= 10
      ) {
        if (this.user.id !== undefined) {
          this.store1.dispatch(
            GameRatingActions.postGameRating({
              gameRating: this.newGameRating,
              id,
              userId: this.user.id,
            })
          );

          this.gameRating$ = this.store1.select(gameRatingSelector);
        }
      } else {
        alert('Please enter a number between 1 and 10');
      }
    });
  }

  handleImageError(event: any) {
    console.log(this.user);
    event.target.src = this.user.photoURL; // Postavi sliku trenutnog korisnika ako se slika ne može učitati
  }

  dodajKomentar(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      if (this.user.id !== undefined) {
        this.store2.dispatch(
          GameReviewActions.postGameReview({
            review: this.newGameReview,
            id,
            userId: this.user.id,
          })
        );
        this.isLoading2$ = this.store1.select(isLoadingGameReviewSelector);

        this.gameReviews$ = this.store1.select(gameReviewSelector);
        this.prikazi();
      }
    });
  }

  dodajKodUsera(): void {
    this.route.params.subscribe((params) => {
      const gameId = params['id'];
      if (this.user.id !== undefined) {
        this.store.dispatch(
          GameActions.addGameToUser({
            userId: this.user.id,
            gameId,
          })
        );
      }
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete the review?')) {
      this.store1.dispatch(GameReviewActions.deleteReview({ id }));
    }
  }

  prikazi() {
    this.gameReviews$.subscribe((res) => {
      console.log(res);
    });
  }
}
