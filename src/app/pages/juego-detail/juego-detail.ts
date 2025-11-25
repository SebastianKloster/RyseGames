import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuegoService } from '../../services/juego-service';
import { JuegoModel, JuegoVerDesarrolladoraDTO, JuegoVerDTO } from '../../model/juego';
import {MatButtonModule} from '@angular/material/button';
import { Carro } from '../../carrito/services/carro';
import { PerfilService } from '../../services/perfil-service';
@Component({
  selector: 'app-juego-detail',
  imports: [CommonModule,MatButtonModule],
  templateUrl: './juego-detail.html',
  styleUrl: './juego-detail.css',
})
export class JuegoDetail implements OnInit{
  private route = inject(ActivatedRoute)
  juegoService = inject(JuegoService);
   private cdr = inject(ChangeDetectorRef);
   carroService = inject(Carro);
   favoritosService = inject(PerfilService);

  juego: JuegoVerDesarrolladoraDTO | null = null;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.juegoService.getJuego(id).subscribe({
      next: (data) =>{
        console.log(this.juego)
        this.juego = data
        this.cdr.detectChanges()
      },
      error: () => {
        alert("No se pudo cargar el juego")
        this.juego = null;
      }
    });
  }

  agregarAlCarrito(juego: JuegoVerDesarrolladoraDTO) {
    this.carroService.agregarJuego(juego.nombre).subscribe({
      next: (carritoActualizado) => {
        alert(`El juego "${juego.nombre}" ha sido agregado al carrito.`);
      },
      error: () => {
        alert('No se pudo agregar el juego al carrito. Inténtalo de nuevo más tarde.');
      }}
    );
  }

  agregarAFavoritos(juego: JuegoVerDesarrolladoraDTO) {
    this.favoritosService.agregarFavorito(juego.id).subscribe({
      next: () => {
        alert(`El juego "${juego.nombre}" ha sido agregado a favoritos.`);
      },
      error: () => {
        alert('No se pudo agregar el juego a favoritos. Inténtalo de nuevo más tarde.');
      }}
    );
}
}