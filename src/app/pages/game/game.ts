import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { JuegoService } from '../../services/juego-service';
import { JuegoModel } from '../../model/juego';
import { CategoriaEnum } from '../../model/categoriaEnum';
import { CompraService } from '../../services/compra-service';
import { FavServices } from '../../services/fav-services';
import { CarritoService } from '../../services/carrito-service';
import { SessionService } from '../../services/session-service';
import { RoleEnum } from '../../model/roleEnum';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {
  routerNav = inject(ActivatedRoute)
  router = inject(Router)
  juegoService = inject(JuegoService)
  compraService = inject(CompraService)
  carritoService = inject(CarritoService)
  favService = inject(FavServices)

  sessionService = inject(SessionService)
  roleEnum = RoleEnum;
  user = this.sessionService.getLoggedUser()

  juegoId = Number(this.routerNav.snapshot.paramMap.get('id'))
  juego = this.juegoService.getJuegoById(this.juegoId);

  isFav = signal<boolean>(false)
  isCarrito = signal<boolean>(false)
  isOwner = signal<boolean>(false)
  isDeveloper = signal<boolean>(false)

  constructor(){
    if (this.user()?.role === RoleEnum.PERFIL) {
      this.consultarFavorito();
      this.consultarCarrito();
      this.consultarOwner();
    }
    this.consultaDeveloper();

  }

  consultaDeveloper(){
    if (this.user()?.desarrolladora?.nombre === this.juego()?.desarrolladora.nombre) {
      this.isDeveloper.set(true)
    } else {
      this.isDeveloper.set(false)
    }
  }

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

  goToEditGame(id:number){
    this.router.navigate(['/game/update/'+id])
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
