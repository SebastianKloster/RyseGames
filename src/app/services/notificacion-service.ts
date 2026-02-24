import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NotificacionDTO } from '../model/notificacionDTO';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:8443/api/notificaciones';

  getByPerfil(){
    return this.http.get<NotificacionDTO[]>(`${this.apiUrl}`);
  }

  marcarTodas() {
  return this.http.put(`${this.apiUrl}/leer-todas`,
    {}
  );
}
}
