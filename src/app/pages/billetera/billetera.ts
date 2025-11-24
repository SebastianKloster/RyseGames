import { Component, inject } from '@angular/core';
import { BilleteraService } from '../../services/billetera.service';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe, } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-billetera',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './billetera.html',
  styleUrls: ['./billetera.css']
})
export class Billetera {

  billeteraService = inject(BilleteraService);
  router = inject(Router);

 saldo = this.billeteraService.billetera;

  ngOnInit() {
    this.billeteraService.refreshBilletera().subscribe();
  }

  cargarFondos(monto: number) {
    if (!monto || monto <= 0) {
    console.log("Monto inválido");
    return;
  }
    this.billeteraService.agregarFondos(monto).subscribe({
      next: () => {
        
        this.billeteraService.refreshBilletera().subscribe();
        alert("Fondos cargados con éxito");
        
      },
      error: () => {
        alert("Error al cargar fondos");
      }
    }); 
    

  }
}

