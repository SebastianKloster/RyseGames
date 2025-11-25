import { Component, computed, inject } from '@angular/core';
import { CarritoService } from '../../services/carrito-service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [CurrencyPipe],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  carritoService = inject(CarritoService)

  juegos = this.carritoService.getCarrito()
  precioTotal = computed(() =>
    this.juegos().reduce((acc, juego) => acc + juego.precio, 0)
  );


  delete(id:number){
    this.carritoService.borrarDelCarrito(id)
  }
  clear(){
    this.carritoService.clear();
  }
  comprarTodo(){
    this.carritoService.comprarTodo();
  }
}
