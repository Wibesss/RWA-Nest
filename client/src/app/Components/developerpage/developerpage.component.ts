import { Component, OnInit } from '@angular/core';
import { Observable, finalize, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import * as DeveloperActions from '../../Store/actions/developer.actions';
import * as GameActions from '../../Store/actions/game.actions';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DeveloperModel } from 'src/app/Store/types/developer.module';
import { Game, GameModel } from 'src/app/Store/types/game.module';
import { DeveloperState } from 'src/app/Store/types/developer.interface';
import { GameState } from 'src/app/Store/types/game.interface';
import {
  developerSelector,
  errorSelector,
  isLoadingSelector,
} from 'src/app/Store/selectors/developer.selectors';
import {
  developerSelectorError,
  developerSelectorGames,
  developerSelectorLoading,
} from 'src/app/Store/selectors/game.selectors';
import { selectUserFeature } from 'src/app/Store/selectors/user.selectors';

@Component({
  selector: 'app-developerpage',
  templateUrl: './developerpage.component.html',
  styleUrls: ['./developerpage.component.scss'],
})
export class DeveloperpageComponent implements OnInit {
  form!: FormGroup;
  isLoading$: Observable<boolean>;
  error$: Observable<String | null>;
  developer$: Observable<DeveloperModel | null>;
  isLoading1$: Observable<boolean>;
  error1$: Observable<String | null>;
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  games$?: Observable<Game[]>;
  newGame: GameModel = {
    title: '',
    photoURL: '',
  };
  authenticated = true;
  isLoggedIn!: boolean;

  constructor(
    private store: Store<DeveloperState>,
    private store1: Store<GameState>,
    private route: ActivatedRoute,
    private fireStorage: AngularFireStorage,
    private formBuilder: FormBuilder
  ) {
    this.isLoading$ = this.store.select(isLoadingSelector);
    this.error$ = this.store.select(errorSelector);
    this.developer$ = this.store.select(developerSelector);
    this.isLoading1$ = this.store.select(developerSelectorLoading);
    this.error1$ = this.store.select(developerSelectorError);
    this.games$ = this.store.select(developerSelectorGames);
  }

  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      photoURL: new FormControl('', Validators.required),
    });
    this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
    });

    this.route.params.subscribe(async (params) => {
      const id = params['id'];

      this.store.dispatch(DeveloperActions.getDeveloperById({ id }));
      this.store1.dispatch(GameActions.getGamesForDeveloper({ id }));
    });

    this.developer$.subscribe((developer) => {
      console.log('Developer Data:', developer);
    });
  }
  closePopup() {
    throw new Error('Method not implemented.');
  }

  handleFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.form.value.photoURL) {
      console.log(this.form.value);
    }
  }

  addGame() {
    this.route.params.subscribe(async (params) => {
      if (this.form.valid) {
        const info = this.form.value;
        const filePath = `developers/${this.selectedFile!.name}`;
        const fileRef = this.fireStorage.ref(filePath);
        const task = this.fireStorage.upload(filePath, this.selectedFile);
        task
          .snapshotChanges()
          .pipe(
            finalize(async () => {
              const downloadURL = await fileRef.getDownloadURL().toPromise();
              const id = params['id'];
              console.log('Nesto drugo', info.title);
              this.store.dispatch(
                GameActions.postGame({
                  game: {
                    title: info.title,
                    photoURL: downloadURL,
                    rating: 0,
                  },
                  id: id,
                })
              );
              this.form.reset();
              this.selectedFile = null;
            })
          )
          .subscribe();
      }
    });
  }

  prikazi() {
    this.developer$?.subscribe((res) => {
      console.log(res);
    });
  }
}
