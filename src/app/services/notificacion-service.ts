import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Notificacion } from '../model/Notificacion';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:8443/api/notificaciones';

  getByPerfil(){
    return this.http.get<Notificacion[]>(`${this.apiUrl}`);
  }

  marcarTodas() {
  return this.http.put(`${this.apiUrl}/leer-todas`,
    {}
  );
}
}
