import { inject, Injectable, signal } from '@angular/core';
import { JuegoCreateDTO, JuegoModel, JuegoUpdateDTO, JuegoVerDesarrolladoraDTO, JuegoVerDTO } from '../model/juego';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session-service';
import { Observable, Subscription, tap } from 'rxjs';
import { environment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
/*   apiURL = "http://localhost:8080/api/juego"
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
  } */

  private http = inject(HttpClient);
  private apiUrl = `${environment.api}/juego`;

  private juegosState = signal<JuegoModel[]>([]);
  private juegoToEditState = signal<JuegoUpdateDTO | null>(null);

  public juegos = this.juegosState.asReadonly();
  public juegoToEdit = this.juegoToEditState.asReadonly();

  constructor() {
    this.loadJuegos();
  }

  loadJuegos() {
    this.http.get<JuegoModel[]>(this.apiUrl)
      .subscribe(juegos => this.juegosState.set(juegos));
  }

  getJuego(id: number): Observable<JuegoVerDesarrolladoraDTO> {
    return this.http.get<JuegoVerDesarrolladoraDTO>(`${this.apiUrl}/${id}`);
  }


  create(dto: JuegoUpdateDTO): Observable<JuegoModel> {
    return this.http.post<JuegoModel>(this.apiUrl, dto)
      .pipe(tap(() => this.loadJuegos()));
  }


  update(id: number, dto: JuegoUpdateDTO): Observable<JuegoModel> {
    return this.http.put<JuegoModel>(`${this.apiUrl}/${id}`, dto)
      .pipe(tap(() => this.loadJuegos()));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => this.loadJuegos()));
  }
}

