import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<string> {
    const formData = { username, password };
    return this.http.post<string>('http://localhost:3000/user/login', formData, {
      withCredentials: true,
    });
  }
}
