import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { SessionService } from './services/session-service';
import { Carrito } from './components/carrito/carrito';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Carrito],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ryzeGames');
}
