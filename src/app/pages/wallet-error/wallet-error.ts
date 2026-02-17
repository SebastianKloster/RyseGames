import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wallet-error',
  imports: [],
  templateUrl: './wallet-error.html',
  styleUrl: './wallet-error.css',
})
export class WalletError {
  route = inject(ActivatedRoute);

  status = signal<string | null>(null);
  paymentType = signal<string | null>(null);

  ngOnInit(){
    this.route.queryParams.subscribe(params =>{
      this.status.set(params['status'] || null);
      this.paymentType.set(params[ 'payment_type'] || null);
    });
  }
}
