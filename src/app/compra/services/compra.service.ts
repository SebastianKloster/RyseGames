import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, tap } from 'rxjs';
import { Carro } from '../../carrito/services/carro';
import { SessionService } from '../../services/session-service';
import { ICompra } from '../models/compra';
@Injectable({
  providedIn: 'root'
})
export class CompraService {

    private apiURL = 'http://localhost:8080/api/compra';

  sessionService = inject(SessionService)
  private sessionSub: Subscription | null = null;

  constructor(
    private http: HttpClient,
    private carroService: Carro
  ) {}

  realizarCompra(): Observable<void> {
    return this.http.post<void>(this.apiURL, {}, {
      headers: this.sessionService.getAuthHeaders()
    }).pipe(
      tap(() => {
        this.carroService.vaciarCarrito().subscribe();
      })
    );
  }

  getComprasCliente(): Observable<ICompra[]> {
    return this.http.get<ICompra[]>(this.apiURL, {
      headers: this.sessionService.getAuthHeaders()
    });
  }

  getTodas(): Observable<ICompra[]> {
    return this.http.get<ICompra[]>(`${this.apiURL}/get`, {
      headers: this.sessionService.getAuthHeaders()
    });
  }
}