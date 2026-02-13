import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BilleteraService {
  apiURL = "https://localhost:8443/api/billetera"
  http = inject(HttpClient)

  consultarSaldo() {
    return this.http.get<number>(this.apiURL)
  }

  cargarSaldo(monto:number) {
    return this.http.post<number>(this.apiURL+"/cargar",{"monto":monto})
  }
}
