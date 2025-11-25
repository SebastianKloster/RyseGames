import { computed, inject, Injectable, signal } from '@angular/core';
import { JuegoModel } from '../model/juego';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SessionService } from './session-service';
import { RoleEnum } from '../model/roleEnum';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  apiURL = "http://localhost:8080/api/carrito"
  sessionService = inject(SessionService)
  private sessionSub: Subscription | null = null;


  private carritoData = signal<JuegoModel[]>([])

  constructor(private http: HttpClient) {
    this.sessionSub = this.sessionService.isLogged$.subscribe(logged => {
      if (!logged) {
        this.carritoData.set([]); // limpia cuando el usuario sale
      } else {
        if (this.sessionService.user()?.role !== RoleEnum.DESARROLLADORA) {
          this.http.get<JuegoModel[]>(this.apiURL).subscribe(
            data => this.carritoData.set(data)
          )
        }
      }
    });
  }

  getCarrito() {
    return this.carritoData.asReadonly();
  }
  agregarAlCarrito(id:number) {
    if (this.isInCarrito(id)) return;

    this.http.post<JuegoModel[]>(this.apiURL+"/"+id, null).subscribe({
      next: data => this.carritoData.set(data),
      
      error: err => {
        alert(err.error.error) //Mensaje de error desde el backend
        console.error("Error al agregar al carrito", err)
      }
    });
  }

  comprarTodo(){
    this.http.post(this.apiURL, null).subscribe({
      next: () => this.carritoData.set([]),
      
      error: err => {
        alert(err.error.error) //Mensaje de error desde el backend
        console.error("Error al agregar al comprar", err)
      }
    });
  }

  borrarDelCarrito(id:number) {
    if (!this.isInCarrito(id)) return;

    this.http.delete<JuegoModel[]>(this.apiURL+"/"+id).subscribe({
      next: data => this.carritoData.set(data),
      
      error: err => {
        alert(err.error.error) //Mensaje de error desde el backend
        console.error("Error al eliminar del carrito", err)
      }
    });
  }

  clear() {
    this.http.delete<void>(this.apiURL).subscribe({
      next: () => this.carritoData.set([]),
      
      error: err => {
        alert(err.error.error) //Mensaje de error desde el backend
        console.error("Error al limpiar el carrito", err)
      }
    });
  }

  isInCarrito(id: number): boolean {
    return this.carritoData().some(juego => juego.id === id);
  }



}
