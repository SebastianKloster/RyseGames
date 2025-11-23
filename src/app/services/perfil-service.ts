import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { PerfilModel, PerfilUpdateDTO } from '../model/perfil';
import { JuegoModel, JuegoVerDesarrolladoraDTO, JuegoVerDTO } from '../model/juego';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private apiUrl = `${environment.api}/perfil`;
  private http = inject(HttpClient);

  private perfilState = signal<PerfilModel[]>([]);
  public perfiles = this.perfilState.asReadonly();

  public juegosPropios = signal<JuegoVerDTO[]>([]);
  public juegosFavoritos = signal<JuegoVerDesarrolladoraDTO[]>([]);


  private getPerfiles(){
    this.http.get<PerfilModel[]>(this.apiUrl).subscribe(perfiles=>{
      this.perfilState.set(perfiles);
    })
  }

  constructor(){
    this.getPerfiles();
  }

   getById(id: number): Observable<PerfilModel> {
    return this.http.get<PerfilModel>(`${this.apiUrl}/id/${id}`);
  }


  getByNickName(nickName: string): Observable<PerfilModel> {
    return this.http.get<PerfilModel>(`${this.apiUrl}/${nickName}`);
  }


  getJuegosByPerfilId(id: number): Observable<JuegoModel[]> {
    return this.http.get<JuegoModel[]>(`${this.apiUrl}/juegos/${id}`);
  }


  getMisJuegos(): Observable<JuegoVerDTO[]> {
    return this.http.get<JuegoVerDTO[]>(`${this.apiUrl}/juegos`);
  }


  updatePerfil(dto: PerfilUpdateDTO): Observable<PerfilModel> {
    return this.http.put<PerfilModel>(`${this.apiUrl}`, dto).pipe(
      tap(updatedPerfil=>{
        this.perfilState.update(currentPerfiles=>
          currentPerfiles.map(perfil=> perfil.id === updatedPerfil.id ? updatedPerfil:perfil)
        )
      })
    );
  }


  getFavoritos(): Observable<JuegoVerDesarrolladoraDTO[]> {
    return this.http.get<JuegoVerDesarrolladoraDTO[]>(`${this.apiUrl}/juegos/favoritos`);
  }


  agregarFavorito(juegoId: number): Observable<PerfilModel> {
    return this.http.patch<PerfilModel>(`${this.apiUrl}/juegos/favoritos/${juegoId}`, {});
  }


  quitarFavorito(juegoId: number): Observable<PerfilModel> {
    return this.http.delete<PerfilModel>(`${this.apiUrl}/juegos/favoritos/${juegoId}`);
  }

  loadJuegos() {
    this.getMisJuegos().subscribe({
      next: (data) => this.juegosPropios.set(data),
      error: (err) => console.error("Error cargando juegos propios:", err)
    });
  }

  loadFavoritos() {
    this.getFavoritos().subscribe({
      next: (data) => this.juegosFavoritos.set(data),
      error: (err) => console.error("Error cargando juegos favoritos:", err)
    });
  }
}
