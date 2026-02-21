import { Component, inject, signal } from '@angular/core';
import { BilleteraService } from '../../services/billetera-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wallet-ok',
  imports: [CommonModule],
  templateUrl: './wallet-ok.html',
  styleUrl: './wallet-ok.css',
})
export class WalletOk {
  billeteraService = inject(BilleteraService)
  saldo = signal(0)

  ngOnInit() {
    setTimeout(() => {
      this.billeteraService.consultarSaldo()
        .subscribe(s => this.saldo.set(s))
    }, 2000);
  }

  sendToBilletera(){
    window.location.href = "/billetera";
  }
}
