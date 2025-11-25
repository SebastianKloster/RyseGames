import { Component, inject, signal } from '@angular/core';
import { JuegoModel } from '../../model/juego';
import { JuegoService } from '../../services/juego-service';
import { RouterLink } from '@angular/router';
import { FavServices } from '../../services/fav-services';

@Component({
  selector: 'app-fav-list',
  imports: [RouterLink],
  templateUrl: './fav-list.html',
  styleUrl: './fav-list.css',
})
export class FavList {
  favService = inject(FavServices)

  juegos = signal<JuegoModel[]>([])

  constructor(){
    this.favService.getFavoritos().subscribe(
      data => this.juegos.set(data)
    )
  } 
}
