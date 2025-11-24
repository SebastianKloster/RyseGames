import { Component } from '@angular/core';
import { BibliotecaList } from "../../components/biblioteca-list/biblioteca-list";

@Component({
  selector: 'app-biblioteca',
  imports: [BibliotecaList],
  templateUrl: './biblioteca.html',
  styleUrl: './biblioteca.css',
})
export class Biblioteca {

}
