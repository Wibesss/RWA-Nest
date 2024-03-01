import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectUserFeature } from 'src/app/Store/selectors/user.selectors';
import { UserState } from 'src/app/Store/types/user.interface';
import { User, UserModel } from 'src/app/Store/types/user.module';
import * as UserActions from '../../Store/actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  toggleMenu = false;
  showDropdown = false;
  logoImg = '../../images/logo.jpg';
  authenticated = true;
  user!: User | null;
  isLoggedIn!: boolean;
  user1: UserModel;

  handleNavBar() {
    console.log(this.logoImg);
    this.toggleMenu = !this.toggleMenu;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  constructor(
    private store: Store<UserState>
  ) {
    this.user1 = new UserModel();
  }

  ngOnInit(): void {
    this.store.pipe(select(selectUserFeature)).subscribe((userState) => {
      this.isLoggedIn = userState.isLoggedIn;
      this.authenticated = userState.isLoggedIn;
      const userJson = localStorage.getItem('loggedUser');
      if (userJson !== null) {
        const userObject = JSON.parse(userJson) as {
          id: number;
          username: string;
          password: string;
        };
        this.user1 = new UserModel(
          userObject.id,
          userObject.username,
          userObject.password
        );
      }
    });
  }

  logout(): void {
    console.log(this.user1);
    this.user = null;
    console.log(this.user);

    this.store.dispatch(UserActions.logOutUser());
  }
}
