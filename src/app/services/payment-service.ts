import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
   api = "https://localhost:8443/api/payments";

  constructor(private http: HttpClient) {}

  createWalletPreference(monto:number) {
    return this.http.post<any>(
      this.api + "/wallet-preference",
      { monto }
    );
  }
}
