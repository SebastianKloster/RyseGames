import { Component, inject, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil-service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-juegos-perfil',
  imports: [CurrencyPipe],
  templateUrl: './juegos-perfil.html',
  styleUrl: './juegos-perfil.css',
})
export class JuegosPerfil implements OnInit {
  perfilService = inject(PerfilService);

  ngOnInit(): void {
   this.perfilService.loadJuegos();
  }
}
