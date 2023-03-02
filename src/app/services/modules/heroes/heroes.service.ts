import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/constants/urls.constants';
import { Heroes } from '../../models/heroes.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private _http: HttpClient) {}

  getAllHeroes(): Observable<Heroes[]> {
    return this._http.get<Heroes[]>(`${BASE_URL}/all-heroes`);
  }
}
