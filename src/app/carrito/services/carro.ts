import { inject, Injectable, signal } from '@angular/core';
import { ICarroDeCompras } from '../model/carro.model/carro.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { SessionService } from '../../services/session-service';

@Injectable({
  providedIn: 'root',
})
export class Carro {
   private apiURL = 'http://localhost:8080/api/carrito';

   sessionService = inject(SessionService)
     private sessionSub: Subscription | null = null;
   
  private carritoState= signal<ICarroDeCompras | null>(null);

  public carrito= this.carritoState.asReadonly();

 

  constructor( private http : HttpClient) {
    this.sessionSub = this.sessionService.isLogged$.subscribe(logged => {
      if (!logged) {
        this.carritoState.set(null); // limpia cuando el usuario sale
      } else {
        this.http.get<ICarroDeCompras>(this.apiURL).subscribe(
          data => this.carritoState.set(data)
        )
      }});
  }

  public obtenerCarrito(){
    this.http.get<ICarroDeCompras>(this.apiURL).subscribe(
    (data) => {
      
tap(c => console.log("Carrito recibido del backend:", c))
        this.carritoState.set(data);  
    });
  }
  
  agregarJuego(nombreJuego: string): Observable<ICarroDeCompras> {
    const body = { nombreJuego };

    return this.http.post<ICarroDeCompras>(`${this.apiURL}/add`, body).pipe(
      tap((carritoActualizado) => {
        this.carritoState.set(carritoActualizado);
      })
    );
  }

  eliminarJuego(idJuego: number): Observable<ICarroDeCompras> {
  return this.http.delete<void>(`${this.apiURL}/remove/${idJuego}`).pipe(
        switchMap(() => this.refrescarCarrito())     
    );
      }

    vaciarCarrito(): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/clear`).pipe(
      tap(() => {
        this.carritoState.set({
          idCarrito: 0,
          juegos: []
        });
      })
    );
  }

    public refrescarCarrito(): Observable<ICarroDeCompras> {
    return this.http.get<ICarroDeCompras>(this.apiURL).pipe(

      tap((carrito) => this.carritoState.set(carrito))
    );
  }

}
