import { Component, inject, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil-service';
import { JuegoVerDesarrolladoraDTO } from '../../model/juego';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-juegos-favoritos',
  imports: [CommonModule],
  templateUrl: './juegos-favoritos.html',
  styleUrl: './juegos-favoritos.css',
})
export class JuegosFavoritos implements OnInit{

  perfilService = inject(PerfilService);

  ngOnInit(): void {
   this.perfilService.loadFavoritos();
  }
eliminar(juegoId: number) {
    this.perfilService.quitarFavorito(juegoId).subscribe({
      next: () => {
        this.perfilService.juegosFavoritos.update(lista =>
          lista.filter(j => j.id !== juegoId)
        );
      }
    });
  }
  }
