import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { DeveloperModel } from '../Store/types/developer.module';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  constructor(private http: HttpClient, private router: Router) {}

  getAllDevelopers(): Observable<DeveloperModel[]> {
    return this.http.get<DeveloperModel[]>(
      'http://localhost:3000/developer/getAllDevelopers',
      { withCredentials: true }
    );
  }

  getDeveloperById(developerId: number): Observable<DeveloperModel> {
    return this.http.get<DeveloperModel>(
      `http://localhost:3000/developer/getDeveloperById/${developerId}`,
      { withCredentials: true }
    );
  }

  addDeveloper(developer: DeveloperModel): Observable<DeveloperModel> {
    const developerData = {
      name: developer.name,
      photoURL: developer.photoURL,
    };
    return this.http.post<DeveloperModel>(
      `http://localhost:3000/developer/addDeveloper`,
      developerData,
      { withCredentials: true }
    );
  }
}
