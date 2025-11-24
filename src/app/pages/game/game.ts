import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { JuegoService } from '../../services/juego-service';
import { JuegoModel } from '../../model/juego';
import { CategoriaEnum } from '../../model/categoriaEnum';
import { CompraService } from '../../services/compra-service';

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

  juego = this.juegoService.getJuegoById(
    Number(this.router.snapshot.paramMap.get('id'))
  );




  comprar(id:number) {
    this.compraService.comprar(id).subscribe({
      next: () => alert("Compra realizada"),
      error: err => {
        alert(err.error.error) //Mensaje de error desde el backend
        console.error("Error al comprar", err)
      }
    });
  }

  addFav(id:number) {
    
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
