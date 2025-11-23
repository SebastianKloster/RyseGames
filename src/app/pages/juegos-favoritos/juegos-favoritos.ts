import { Component, inject, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil-service';
import { JuegoVerDesarrolladoraDTO } from '../../model/juego';

@Component({
  selector: 'app-juegos-favoritos',
  imports: [],
  templateUrl: './juegos-favoritos.html',
  styleUrl: './juegos-favoritos.css',
})
export class JuegosFavoritos implements OnInit{

  favoritos: JuegoVerDesarrolladoraDTO[] = [];
  perfilService = inject(PerfilService);

    ngOnInit() {
    this.perfilService.getFavoritos().subscribe({
      next: data => this.favoritos = data
    });
  }

  quitar(juegoId: number) {
    this.perfilService.quitarFavorito(juegoId).subscribe({
      next: () => {
        this.favoritos = this.favoritos.filter(f => f.id !== juegoId);
      }
    });
  }

  }

