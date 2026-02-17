import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { JuegoModel } from '../model/juego';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SessionService } from './session-service';
import { RoleEnum } from '../model/roleEnum';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  apiURL = "https://localhost:8443/api/carrito"
  sessionService = inject(SessionService)
  private sessionSub: Subscription | null = null;
  private STORAGE_KEY = 'carrito';


  private carritoData = signal<JuegoModel[]>(this.cargarDesdeStorage());

  constructor(private http: HttpClient) {
    // Persistir automáticamente cada cambio
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.carritoData()));
    });

    // Limpiar al cerrar sesión
    effect(() => {
      if (!this.sessionService.isLoggedIn()) {
        this.carritoData.set([]);
        localStorage.removeItem(this.STORAGE_KEY);
      }
    });
  }

  getCarrito() {
    return this.carritoData.asReadonly();
  }

  agregarAlCarrito(juego:JuegoModel) {
    if (this.isInCarrito(juego.id)) return;
    this.carritoData.update(c => [...c, juego]);
    console.log(this.carritoData())
  }
  borrarDelCarrito(id:number) {
    this.carritoData.update(c => c.filter(j => j.id !== id));
  }

  comprarTodo() {
    const ids = this.getIds();

    this.http.post('https://localhost:8443/api/compra', { gameIds: ids }).subscribe({
      next: () => this.clear(),
      error: err => {
        alert(err.error.error);
        console.error("Error al comprar", err);
      }
    });
  }

  clear() {
    this.carritoData.set([]);
  }

  isInCarrito(id: number): boolean {
    return this.carritoData().some(juego => juego.id === id);
  }

  getIds(): number[] {
    return this.carritoData().map(j => j.id);
  }


  private cargarDesdeStorage(): JuegoModel[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return [];

    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
}
