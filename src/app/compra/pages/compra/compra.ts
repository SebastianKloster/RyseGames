import { Component, inject } from '@angular/core';
import { CompraService } from '../../services/compra.service';
import { Carro } from '../../../carrito/services/carro';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms'
@Component({
  selector: 'app-compra',
  imports: [CommonModule, CurrencyPipe,MatRadioModule,FormsModule],
  templateUrl: './compra.html',
  styleUrl: './compra.css',
})
export class Compra {

    router = inject(Router);


  juegos: any[] = [];
  total: number = 0;
  metodoPago: string = '';

  constructor(
    private compraService: CompraService,
    private carroService: Carro
  ) {}

  ngOnInit() {
    this.juegos = this.carroService.carrito()?.juegos|| [];
    this.total = this.carroService.totalCompra();
  }


  finalizarCompra() {
    if (!this.metodoPago){
      alert("Seleccioná un método de pago");
      return;
    }

    this.compraService.realizarCompra().subscribe({
      next: () => {alert("Compra realizada con éxito!");
        this.router.navigate(['/compra']);
      }
      ,
      error: () => alert("Ocurrió un error al procesar la compra")
    });
  }
  

  seleccionarMetodo(metodo: string) {
  this.metodoPago = metodo;
  console.log("Método seleccionado:", metodo);
}
}
