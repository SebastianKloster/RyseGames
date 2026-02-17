import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wallet-pending',
  imports: [],
  templateUrl: './wallet-pending.html',
  styleUrl: './wallet-pending.css',
})
export class WalletPending {

  route = inject(ActivatedRoute);
  paymentId = signal<string | null>(null);
  status = signal<string | null>(null);

  ngOnInit(){
    this.route.queryParams.subscribe(params =>{
      this.paymentId.set(params['payment_id'] || null);
      this.status.set(params['status'] || null);
    });
  }
}
