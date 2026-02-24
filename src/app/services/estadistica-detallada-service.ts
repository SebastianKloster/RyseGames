import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DesarrolladoraStatsDTO } from '../model/estadisticaDetalla';

@Injectable({
  providedIn: 'root',
})
export class EstadisticaDetalladaService {
  private http = inject(HttpClient);

  apiURL = 'https://localhost:8443/api/estadisticas';

  getDashboard(days = 30): Observable<DesarrolladoraStatsDTO> {
    const params = new HttpParams().set('days', String(days));
    return this.http.get<DesarrolladoraStatsDTO>(`${this.apiURL}`, { params });
  }
}