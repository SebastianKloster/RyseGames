
import { Component, computed, inject, OnInit } from '@angular/core';
import { Carro } from '../../services/carro';
import { Subscription } from 'rxjs'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
selector: 'app-carro-list',
 imports: [  MatSlideToggleModule, MatCardModule,MatIconModule,RouterLink ],
templateUrl: './carro-list.html',
 styleUrl: './carro-list.css',
})
export class CarroList implements OnInit { 
 

  carritoService = inject(Carro);
  
  router = inject(Router);

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
  
    

 confirmarCompra() {
 if (this.carrito()?.juegos.length === 0 || !this.carrito()) {
 console.warn("El carrito está vacío. Agregá juegos antes de proceder a la compra.");
 return; }
 this.router.navigate(['/compra']);
 }

 empty(){
  return !this.carrito() || this.carrito()!.juegos.length === 0;
 }

}