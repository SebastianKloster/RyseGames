import { Component, inject, signal } from '@angular/core';
import { BilleteraService } from '../../services/billetera-service';
import { OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-billetera',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './billetera.html',
  styleUrl: './billetera.css',
})
export class Billetera {
  billeteraService = inject(BilleteraService)

  saldo = signal<number>(0)

  fb = inject(FormBuilder)
  cargarSaldoForm = this.fb.nonNullable.group({
    monto: [0, [Validators.required, Validators.min(1)]],
  })

  constructor() {
    this.consultarSaldo();
  }

  handleSubmit() {
    if (this.cargarSaldoForm.valid) {
      this.cargarSaldo(this.cargarSaldoForm.getRawValue().monto);
    } else {
      alert("Fomurlario inválido");
    }
  }

  consultarSaldo() {
    this.billeteraService.consultarSaldo().subscribe({
      next: (saldo) => {
        console.log("Saldo:", saldo);
        this.saldo.set(saldo)
      },
      error: (err) => {
        alert(err.error.error)
        console.error("Error al consultar saldo:", err);
      }
    });
  }

  cargarSaldo(monto:number) {
    this.billeteraService.cargarSaldo(monto).subscribe({
      next: (saldo) => {
        console.log("Saldo:", saldo);
        this.saldo.set(saldo)
      },
      error: (err) => {
        alert(err.error.error)
        console.error("Error al cargar saldo:", err);
      }
    });
  }

}
