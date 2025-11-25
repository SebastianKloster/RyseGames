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
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './juego-detail.html',
  styleUrl: './juego-detail.css',
})
export class JuegoDetail implements OnInit{
  private route = inject(ActivatedRoute)
  juegoService = inject(JuegoService);
   private cdr = inject(ChangeDetectorRef);
   private carroService = inject(Carro)
   private perfilService = inject(PerfilService);
   

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
  agregarAlCarrito(juego: JuegoVerDTO) {

  this.carroService.agregarJuego(juego.nombre).subscribe({
    
    next: (resp: any) => {
      if (resp && resp.yaExiste) {
        alert(`El juego "${juego.nombre}" ya está en el carrito.`);
      } else {
        alert(`El juego "${juego.nombre}" ha sido agregado al carrito.`);
      }
    },

    error: (err) => {
      console.error('Error al agregar al carrito:', err);
      alert(`Ya tienes el juego.`);
    }

  });
}

  agregarAFavoritos(juego: JuegoVerDesarrolladoraDTO) {
    this.perfilService.agregarFavorito(juego.id).subscribe( {
      next: () => {
        alert(`El juego "${juego.nombre}" ha sido agregado a favoritos.`);
      },
      error: (err) => {
        console.error('Error al agregar a favoritos:', err);
        alert(`El juego "${juego.nombre}" ya está en favoritos.`);
      }
      
    }); 
}
}