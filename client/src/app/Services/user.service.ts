import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { User } from '../Store/types/user.module';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}
  putAnime(userId: string, photoURL: any): Observable<User> {
    return this.http.put(
      `http://localhost:3000/user/UpdateSliku/${userId}`,
      photoURL,
      {
        withCredentials: true,
      }
    );
  }
  getUser(userId: number): Observable<User> {
    return this.http.get<User>(
      `http://localhost:3000/user/getUserById/${userId}`,
      { withCredentials: true }
    );
  }
}