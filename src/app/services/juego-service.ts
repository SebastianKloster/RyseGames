import { computed, inject, Injectable, signal } from '@angular/core';
import { JuegoModel } from '../model/juego';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session-service';
import { Subscription, tap } from 'rxjs';
import { CreateGameDTO } from '../model/createGameDTO';

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  apiURL = "http://localhost:8080/api/juego"
  sessionService = inject(SessionService)
  private sessionSub: Subscription | null = null;


  private juegosData = signal<JuegoModel[]>([])

  constructor(private http: HttpClient) {
    this.sessionSub = this.sessionService.isLogged$.subscribe(logged => {
      if (!logged) {
        this.juegosData.set([]); // limpia cuando el usuario sale
      } else {
        this.http.get<JuegoModel[]>(this.apiURL).subscribe(
          data => this.juegosData.set(data)
        )
      }
    });
  }

  getJuegos() {
    return this.juegosData.asReadonly();
  }

  getJuegoById(id:number) {
    return computed(() => {
      return this.juegosData().find(game => game.id === id) ?? null;
    });
  }

  getBiblioteca(){ //Juegos comprados por perfil
    return this.http.get<JuegoModel[]>("http://localhost:8080/api/perfil/juegos")
  }

  postGame(newGame:CreateGameDTO) {
    return this.http.post<JuegoModel>(this.apiURL, newGame).pipe(
      tap( game => {
        this.juegosData.update(juegosDataOld => [...juegosDataOld, game]);
      })
    )
  }
}
