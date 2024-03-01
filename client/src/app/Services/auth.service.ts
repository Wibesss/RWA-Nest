import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/Store/types/user.module';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  logout() {
    return this.http.post(
      `${this.API_URL}/user/logout`,
      {},
      { withCredentials: true }
    );
  }

  getLoggedUser() {
    const user = this.http.get(`${this.API_URL}/user/getLoggedUser`, {
      withCredentials: true,
    });
    return user;
  }

  
}
