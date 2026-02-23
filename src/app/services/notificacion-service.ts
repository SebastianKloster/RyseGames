import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:8443/api/notificaciones';

  getByPerfil(idPerfil: number){
    return this.http.get<any[]>(`${this.apiUrl}/${idPerfil}`);
  }

  marcarTodas(perfilId: number) {
  return this.http.put(`${this.apiUrl}/leer-todas/${perfilId}`,
    {}
  );
}
}
