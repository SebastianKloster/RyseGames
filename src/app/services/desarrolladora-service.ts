import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Desarrolladora } from '../model/desarrolladora';
import { Observable, tap } from 'rxjs';
import { JuegoModel, JuegoVerDesarrolladoraDTO, JuegoVerDTO } from '../model/juego';
import { SessionService } from './session-service';

@Injectable({
  providedIn: 'root',
})
export class DesarrolladoraService {
  private apiUrl = `${environment.api}/desarrolladora`
  private http = inject(HttpClient);

  private desarrolladoraState = signal<Desarrolladora[]>([]);
  public desarrolladoras = this.desarrolladoraState.asReadonly();
  public juegos = signal<JuegoVerDesarrolladoraDTO[]>([]);

  private getDesarrolladoras(){
    this.http.get<Desarrolladora[]>(this.apiUrl).subscribe(desarrolladoras=>{
      this.desarrolladoraState.set(desarrolladoras);
    })
  }

  constructor(private session: SessionService){
    this.getDesarrolladoras();
  }

  getById(id: number):Observable<Desarrolladora>{
    return this.http.get<Desarrolladora>(`${this.apiUrl}/${id}`);
  }


  update(desarrolladora: Desarrolladora):Observable<Desarrolladora>{
    return this.http.put<Desarrolladora>(this.apiUrl, desarrolladora).pipe(
      tap(updatedDesarrolladora=>{
        this.desarrolladoraState.update(currentDesarrolladoras=>
          currentDesarrolladoras.map(desarrolladora=> desarrolladora.id === updatedDesarrolladora.id ? updatedDesarrolladora: desarrolladora)
        )
      })
    )
  }

  getJuegosPropios():Observable<JuegoVerDesarrolladoraDTO[]>{
    return this.http.get<JuegoVerDesarrolladoraDTO[]>(`${this.apiUrl}/juegos-propios`);
  }

  loadJuegos() {
    this.getJuegosPropios().subscribe({
      next: (data) => this.juegos.set(data),
      error: (err) => console.error("Error cargando juegos propios:", err)
    });
  }
}
