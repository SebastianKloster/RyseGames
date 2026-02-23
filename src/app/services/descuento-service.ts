import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DescuentoDTO } from '../model/descuentoDTO';

@Injectable({
  providedIn: 'root',
})
export class DescuentoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:8443/api/descuentos';

  crearDescuento(dto : DescuentoDTO){
    return this.http.post(this.apiUrl, dto);
  }
}
