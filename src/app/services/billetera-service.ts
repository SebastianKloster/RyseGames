import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { PaymentService } from './payment-service';

@Injectable({
  providedIn: 'root',
})
export class BilleteraService {
  apiURL = "https://localhost:8443/api/billetera"
  http = inject(HttpClient)
  paymentService = inject(PaymentService);

  consultarSaldo() {
    return this.http.get<number>(this.apiURL)
  }


cargarSaldo(monto: number) {

    return this.paymentService.createWalletPreference(monto);
  }
}
