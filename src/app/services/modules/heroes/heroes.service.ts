import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/constants/urls.constants';
import { Hero } from '../../models/heroes.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private _http: HttpClient) {}

  getAllHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(`${BASE_URL}/hero/all`);
  }

  getHero(id: number): Observable<Hero> {
    return this._http.get<Hero>(`${BASE_URL}/hero/${id}`);
  }

  newHero(hero: Hero): Observable<Hero> {
    return this._http.post<Hero>(`${BASE_URL}/hero`, { hero });
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this._http.put<Hero>(`${BASE_URL}/hero/${hero.id}`, { hero });
  }

  delete(id: number): Observable<Hero> {
    return this._http.delete<Hero>(`${BASE_URL}/hero/${id}`);
  }
}
