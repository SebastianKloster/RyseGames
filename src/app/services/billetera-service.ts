import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BilleteraService {
  apiURL = "http://localhost:8080/api/billetera"
  http = inject(HttpClient)

  consultarSaldo() {
    return this.http.get<number>(this.apiURL)
  }

  cargarSaldo(monto:number) {
    return this.http.post<number>(this.apiURL+"/cargar",{"monto":monto})
  }
}
