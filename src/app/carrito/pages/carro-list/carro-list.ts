
import { Component, computed, inject, OnInit } from '@angular/core';
import { Carro } from '../../services/carro';
import { Subscription } from 'rxjs'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
@Component({
selector: 'app-carro-list',
 imports: [  MatSlideToggleModule, MatCardModule,MatIconModule],
templateUrl: './carro-list.html',
 styleUrl: './carro-list.css',
})
export class CarroList implements OnInit { 
carritoService = inject(Carro);
carrito = this.carritoService.carrito;
  private loadSubscription: Subscription | undefined;

   ngOnInit(): void {
 
    if (this.carrito() === null) {
      
     console.log("Carrito en el componente:", this.carrito());
      this.loadSubscription = this.carritoService.refrescarCarrito().subscribe({
        next: () => {
          console.log("Carrito luego de refrescar:", this.carrito())
        },
        error: (err) => {
          console.error("Error al cargar el carrito en el componente:", err);
 
        }
      });
    }
 }


  ngOnDestroy(): void {
    this.loadSubscription?.unsubscribe();
  }

 removeJuego(id: number) {
this.carritoService.eliminarJuego(id).subscribe();
 }
 total = computed(() => {
  const carrito = this.carrito();
  if (!carrito || !carrito.juegos) return 0;

  return carrito.juegos.reduce((sum, item) => sum + item.precio, 0);
});
}