import { inject, Injectable, signal } from '@angular/core';
import { JuegoCreateDTO, JuegoModel, JuegoUpdateDTO, JuegoVerDTO } from '../model/juego';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroments';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  /* apiURL = "http://localhost:3000/juegos"

  private juegosData = signal<JuegoModel[]>([])

  constructor(private http: HttpClient) {
    this.http.get<JuegoModel[]>(this.apiURL).subscribe(
      data => this.juegosData.set(data)
    )
  }


  getJuegos() {
    return this.juegosData.asReadonly();
  } */


  private apiUrl = `${environment.api}/juego`;

  private http = inject(HttpClient);

  private juegosState = signal<JuegoModel[]>([]);
  private juegoToEditState = signal<JuegoUpdateDTO | null>(null);

  public juegos = this.juegosState.asReadonly();
  public juegoToEdit = this.juegoToEditState.asReadonly();

  private getJuegos(){
    this.http.get<JuegoModel[]>(this.apiUrl).subscribe(juegos => {
      this.juegosState.set(juegos);
    });
  }

  constructor(){
    this.getJuegos();
  }

  postJuego(juego: JuegoCreateDTO):Observable<JuegoModel>{
    return this.http.post<JuegoModel>(this.apiUrl, juego).pipe(
      tap(newJuego => {
        this.juegosState.update(currentJuegos =>[...currentJuegos, newJuego]);
      })
    )
  }

  delete(id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(()=>{
        this.juegosState.update(currentJuegos =>
          currentJuegos.filter(juego=>juego.id !== id)
        )
      })
    )
  }

  update(juegoToUpdate:JuegoUpdateDTO):Observable<JuegoModel>{
  return this.http.put<JuegoModel>(`${this.apiUrl}/${juegoToUpdate.id}`,juegoToUpdate).pipe(
    tap(updatedJuego =>{
      this.juegosState.update(currentJuegos =>
        currentJuegos.map(juego =>
          juego.id === updatedJuego.id ? updatedJuego : juego
      )
    );
    })
  );
  }

  getJuegoById(id: number):Observable<JuegoModel>{
    return this.http.get<JuegoModel>(`${this.apiUrl}/${id}`);
  }

  selectJuegoToEdit(juego: JuegoUpdateDTO){
    this.juegoToEditState.set(juego);
  }

  clearJuegoToEdit(){
    this.juegoToEditState.set(null);
  }

  getJuegoByNombre(nombre: string):Observable<JuegoVerDTO>{
    return this.http.get<JuegoVerDTO>(`${this.apiUrl}/nombre/${nombre}`);
  }

  getJuegoByCategoria(categoria: string):Observable<JuegoVerDTO[]>{
    return this.http.get<JuegoVerDTO[]>(`${this.apiUrl}/categoria/${categoria}`);
  }
}
