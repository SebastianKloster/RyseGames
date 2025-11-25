import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { JuegoService } from '../../services/juego-service';
import { JuegoModel } from '../../model/juego';
import { CategoriaEnum } from '../../model/categoriaEnum';
import { CompraService } from '../../services/compra-service';
import { FavServices } from '../../services/fav-services';
import { CarritoService } from '../../services/carrito-service';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {
  router = inject(ActivatedRoute)
  juegoService = inject(JuegoService)
  compraService = inject(CompraService)
  carritoService = inject(CarritoService)
  favService = inject(FavServices)

  juegoId = Number(this.router.snapshot.paramMap.get('id'))
  juego = this.juegoService.getJuegoById(this.juegoId);

  isFav = signal<boolean>(false)
  isCarrito = signal<boolean>(false)
  isOwner = signal<boolean>(false)

  constructor(){
    this.consultarFavorito();
    this.consultarCarrito();
    this.consultarOwner();

  }


  // comprar(id:number) {
  //   this.compraService.comprar(id).subscribe({
  //     next: () => alert("Compra realizada"),
  //     error: err => {
  //       alert(err.error.error) //Mensaje de error desde el backend
  //       console.error("Error al comprar", err)
  //     }
  //   });
  // }

  consultarOwner() {
    this.juegoService.isInBiblioteca(this.juegoId).subscribe(
      data => this.isOwner.set(data)
    )
  }

  consultarCarrito() {
    if (this.carritoService.isInCarrito(this.juegoId)) {
      this.isCarrito.set(true)
    } else {
      this.isCarrito.set(false)
    }
    console.log(this.carritoService.isInCarrito(this.juegoId))
  }

  addCarrito(id:number) {
    this.carritoService.agregarAlCarrito(id);
    this.isCarrito.set(true)
  }
  removeCarrito(id:number) {
    this.carritoService.borrarDelCarrito(id);
    this.isCarrito.set(false)
  }


   consultarFavorito() {
    this.favService.consultarFav(this.juegoId).subscribe({
      next: fav => {
        this.isFav.set(fav);
      },
      error: err => {
        alert(err.error.error) //Mensaje de error desde el backend
        console.error("Error al agregar", err)
      }
    });
  }
  
  addFav(id:number) {
    this.favService.addFav(id).subscribe({
      next: () => {
        alert("Juego agregado a Favoritos");
        this.isFav.set(true);
      },
      error: err => {
        alert(err.error.error) //Mensaje de error desde el backend
        console.error("Error al agregar", err)
      }
    });
  }
  removeFav(id:number) {
    this.favService.removeFav(id).subscribe({
      next: () => {
        alert("Juego eliminado de Favoritos")
        this.isFav.set(false);
      },
      error: err => {
        alert(err.error.error) //Mensaje de error desde el backend
        console.error("Error al eliminar", err)
      }
    });
  }





  getCategoryColor(categoria: CategoriaEnum): string {
      switch (categoria) {
        case CategoriaEnum.ACCION:
          return '#e53935'; // Rojo
        case CategoriaEnum.ARCADE:
          return '#fb8c00'; // Naranja
        case CategoriaEnum.AVENTURA:
          return '#43a047'; // Verde
          case CategoriaEnum.ESTRATEGIA:
            return '#5c6bc0'; // Azul claro
            case CategoriaEnum.DEPORTE:
          // return '#ba68c8'; // Violeta claro
          return '#43a047'; // Verde
        case CategoriaEnum.MMO:
          return '#26a69a'; // Turquesa claro
        case CategoriaEnum.RPG:
          return '#7e57c2'; // Púrpura claro
        default:
          return '#9e9e9e';
      }
    }
  
    getCategoryIcon(cat: CategoriaEnum): string {
      const map: Record<CategoriaEnum, string> = {
        ACCION: 'fa-solid fa-gun',
        ARCADE: 'fa-solid fa-gamepad',
        AVENTURA: 'fa-solid fa-person-hiking',
        ESTRATEGIA: 'fa-solid fa-chess',
        DEPORTE: 'fa-solid fa-futbol',
        MMO: 'fa-solid fa-users',
        RPG: 'fa-solid fa-dungeon'
      };
  
      return map[cat];
    }
}
