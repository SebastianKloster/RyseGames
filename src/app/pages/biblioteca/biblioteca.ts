import { Component } from '@angular/core';
import { BibliotecaList } from "../../components/biblioteca-list/biblioteca-list";
import { FavList } from "../../components/fav-list/fav-list";
import { Carrito } from "../../components/carrito/carrito";

@Component({
  selector: 'app-biblioteca',
  imports: [BibliotecaList, FavList, Carrito],
  templateUrl: './biblioteca.html',
  styleUrl: './biblioteca.css',
})
export class Biblioteca {

}
