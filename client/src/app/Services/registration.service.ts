import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  async registerUser(formData: any): Promise<boolean> {
    try {
      await this.http
        .post('http://localhost:3000/user/addUser', formData)
        .toPromise();
      return true;
    } catch (error) {
      return false;
    }
  }

  async checkExistingUser(username: string): Promise<boolean> {
    try {
      const response = await this.http
        .get(`http://localhost:3000/user/getUserByUsername/${username}`)
        .toPromise();
      console.log(response); // Dodajte ovo
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
