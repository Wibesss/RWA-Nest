import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameService } from 'src/app/Services/game.service';
import { homeSelectorError, homeSelectorGames, homeSelectorLoading } from 'src/app/Store/selectors/game.selectors';
import { GameState } from 'src/app/Store/types/game.interface';
import { Game } from 'src/app/Store/types/game.module';
import * as gameActions from '../../Store/actions/game.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  games$?: Observable<Game[]>;
  searchText: string = '';
  
  constructor(
    private store: Store<GameState>
  ) {
    this.isLoading$ = this.store.select(homeSelectorLoading);
    this.error$ = this.store.select(homeSelectorError);
    this.games$ = this.store.select(homeSelectorGames);
  }

  getAllGames(){
    this.store.dispatch(gameActions.getAllGames());
  }
  
  ngOnInit(): void {
    this.getAllGames();
  }

  prikazi() {
    this.games$?.subscribe((res) => {
      console.log(res);
    });
  }

  getBackgroundStyle(imageUrl: string) {
    return {
      'background-image': `url(${imageUrl})`,
    };
  }
}
