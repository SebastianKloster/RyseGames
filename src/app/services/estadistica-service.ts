import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { EstadisticaModel } from '../model/estadistica';
import { SessionService } from './session-service';

@Injectable({
  providedIn: 'root',
})
export class EstadisticaService {
  apiURL = "http://localhost:8080/api/desarrolladora/estadistica"

  sessionService = inject(SessionService)
  private sessionSub: Subscription | null = null;


  private estadisticasData = signal<EstadisticaModel[]>([])

  constructor(private http: HttpClient) {
    this.sessionSub = this.sessionService.isLogged$.subscribe(logged => {
      if (!logged) {
        this.estadisticasData.set([]); // limpia cuando el usuario sale
      } else {
        this.http.get<EstadisticaModel[]>(this.apiURL).subscribe(
          data => this.estadisticasData.set(data)
        )
      }
    });
  }

  getEstadisticas() {
    return this.estadisticasData.asReadonly()
  }
}
