import { computed, inject, Injectable, signal } from '@angular/core';
import { JuegoModel } from '../model/juego';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SessionService } from './session-service';
import { map, Observable, Subscription, tap } from 'rxjs';
import { CreateGameDTO } from '../model/createGameDTO';
import { JuegoDescuentoDTO } from '../model/juegoDescuentoDTO';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  apiURL = "https://localhost:8443/api/juego"
  sessionService = inject(SessionService)

  constructor(private http: HttpClient) {}


  
  getPage(page: number, categoria?: string) {
    let params = new HttpParams().set('page', page);

    if (categoria) {
      params = params.set('categoria', categoria);
    }

    return this.http.get<Page<JuegoModel>>(this.apiURL, { params });
  }


  getJuegoById(id: number) {
    return this.http.get<JuegoModel>(`${this.apiURL}/${id}`);
  }


  getBiblioteca(){ //Juegos comprados por perfil
    return this.http.get<JuegoModel[]>("http://localhost:8080/api/perfil/juegos")
  }

  isInBiblioteca(juegoId: number): Observable<boolean> {
    return this.getBiblioteca().pipe(
      map(juegos => juegos.some(j => j.id === juegoId))
    );
  }


  postGame(newGame: CreateGameDTO) {
    return this.http.post<JuegoModel>(this.apiURL, newGame);
  }

  updateGame(game: JuegoModel) {
    return this.http.put<JuegoModel>(`${this.apiURL}/${game.id}`, game);
  }

  getByDesarrolladora(){
  return this.http.get<JuegoDescuentoDTO[]>("https://localhost:8443/api/desarrolladora/juegos-propios")
  }
}
