import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginComponent } from './Components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './Components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { reducers } from './Store/reducers/user.reducers';
import { UserEffects } from './Store/effects/user.effects';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './environments/enviroment';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { FilterPipe } from './Components/filter/filter.pipe';
import { GameModel } from './Store/types/game.module';
import { gameReducer } from './Store/reducers/game.reducers';
import { GamesEffects } from './Store/effects/game.effects';
import { GamepageComponent } from './Components/gamepage/gamepage.component';
import { ratingReducer } from './Store/reducers/gamerating.reducers';
import { reviewReducer } from './Store/reducers/gamereview.reducers';
import { GameRatingEffects } from './Store/effects/gamerating.effects';
import { GameReviewEffects } from './Store/effects/gamereview.effects';
import { DeveloperpageComponent } from './Components/developerpage/developerpage.component';
import { developerReducer } from './Store/reducers/developer.reducers';
import { DeveloperEffects } from './Store/effects/developer.effects';
import { DevelopersComponent } from './Components/developers/developers.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    HomeComponent,
    FilterPipe,
    GamepageComponent,
    DeveloperpageComponent,
    DevelopersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ user: reducers }, {}),
    StoreModule.forFeature('Games', gameReducer),
    StoreModule.forFeature('GameRating', ratingReducer),
    StoreModule.forFeature('GameReview', reviewReducer),
    StoreModule.forFeature('Developers', developerReducer),

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    FormsModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([
      UserEffects,
      GamesEffects,
      GameRatingEffects,
      GameReviewEffects,
      DeveloperEffects,
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
