import { Component, inject, signal } from '@angular/core';
import { JuegoService } from '../../services/juego-service';
import { JuegoModel } from '../../model/juego';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-biblioteca-list',
  imports: [RouterLink],
  templateUrl: './biblioteca-list.html',
  styleUrl: './biblioteca-list.css',
})
export class BibliotecaList {
  juegosService = inject(JuegoService)

  juegos = signal<JuegoModel[]>([])


  constructor(){
    this.juegosService.getBiblioteca().subscribe(
      data => this.juegos.set(data)
    )
  }
}
