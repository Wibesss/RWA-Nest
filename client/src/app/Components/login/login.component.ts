import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LoginService } from 'src/app/Services/login.service';
import { User } from 'src/app/Store/types/user.module';
import * as UserActions from '../../Store/actions/user.actions';
import {
  selectLoading,
  selectLoggedIn,
} from 'src/app/Store/selectors/user.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoading$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService,
    private store: Store<User>
  ) {
    this.isLoading$ = this.store.pipe(select(selectLoading));
    this.isLoggedIn$ = this.store.pipe(select(selectLoggedIn));
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login(): void {
    const credentials = this.form.value;
    this.store.dispatch(
      UserActions.loginUser({
        user: {
          username: credentials.username,
          password: credentials.password,
        },
      })
    );

    this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/']);
      }
    });
  }
}
