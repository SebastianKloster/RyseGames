import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DescuentoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:8443/api/descuentos';

  crearDescuento(dto : any){
    return this.http.post(this.apiUrl, dto);
  }

  /* getByDesarrolladora(){
  return this.http.get("https://localhost:8443/api/desarrolladora/juegos-propios")
  } */
}
