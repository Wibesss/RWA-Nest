import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from './Store/types/user.interface';
import * as userActions from "./Store/actions/user.actions"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';
  constructor(private store: Store<UserState>) {}

  ngOnInit(): void {
    let loggedIn = false;
    if (localStorage.getItem('isLoggedIn')) {
      loggedIn = true;
    } else {
      loggedIn = false;
    }
    this.store.dispatch(
      userActions.browserRolead({ isLoading: false, isLoggedin: loggedIn })
    );
  }
}
