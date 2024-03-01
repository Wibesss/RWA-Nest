import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeveloperState } from 'src/app/Store/types/developer.interface';
import { Developer } from 'src/app/Store/types/developer.module';
import * as developerActions from '../../Store/actions/developer.actions';
import { selectorDevelopers, selectorError, selectorLoading } from 'src/app/Store/selectors/developer.selectors';


@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.scss']
})
export class DevelopersComponent {
  isLoading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  developers$?: Observable<Developer[]>;
  searchText: string = '';
  
  constructor(
    private store: Store<DeveloperState>
  ) {
    this.isLoading$ = this.store.select(selectorLoading);
    this.error$ = this.store.select(selectorError);
    this.developers$ = this.store.select(selectorDevelopers);
  }

  getAllGames(){
    this.store.dispatch(developerActions.getAllDevelopers());
  }
  
  ngOnInit(): void {
    this.getAllGames();
  }

  prikazi() {
    this.developers$?.subscribe((res) => {
      console.log(res);
    });
  }

  getBackgroundStyle(imageUrl: string) {
    return {
      'background-image': `url(${imageUrl})`,
    };
  }
}
