import { Component, inject } from '@angular/core';
import { JuegoService } from '../../services/juego-service';
import { Router, RouterLink } from '@angular/router';
import { JuegoUpdateDTO } from '../../model/juego';
import { PerfilService } from '../../services/perfil-service';
import { environment } from '../../enviroments/enviroments';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-juegos-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './juegos-list.html',
  styleUrl: './juegos-list.css',
})
export class JuegosList  {
juegoService = inject(JuegoService);
  perfilService = inject(PerfilService);

  agregarFav(id: number) {
    this.perfilService.agregarFavorito(id).subscribe({
      next: () => alert('Agregado a favoritos'),
      error: err => alert('Error: ' + err.message)
    });
  }
}
