import { Component, inject } from '@angular/core';
import { JuegoService } from '../../services/juego-service';
import { CategoriaEnum } from '../../model/categoriaEnum';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-store-list',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './store-list.html',
  styleUrl: './store-list.css',
})
export class StoreList {
  router = inject(Router) //Router: nos permite redireccionar al usuario a otra pagina
  
  juegosService = inject(JuegoService)

  juegos = this.juegosService.getJuegos()


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


  // Funcion para Testing hasta que implementemos imagenes reales
  getCategoryImage(cat: CategoriaEnum): string {
    const map: Record<CategoriaEnum, string> = {
      ACCION: "https://assets.dev-filo.dift.io/img/2020/09/25/hipertextual-remake-metal-gear-solid-estaria-camino-playstation-5-2020271937_re.jpg",
      ARCADE: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_Tetris99_image1600w.jpg",
      AVENTURA: "https://www.nintendo.com/eu/media/images/assets/nintendo_switch_2_games/thelegendofzeldabreathofthewild_nintendoswitch2edition/2x1_NSwitch2_TLoZTBotWNSwitch2Edition.jpg",
      ESTRATEGIA: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/813780/header.jpg?t=1760473253",
      DEPORTE: "https://i.blogs.es/5fe30d/fifa-21-intros_1/1366_521.jpeg",
      MMO: "https://www.yeabitinformatica.com/wp-content/uploads/2020/10/world-of-warcraft-todas-las-expansiones.jpg",
      RPG: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/72850/header.jpg?t=1721923139"
    };

    return map[cat];
  }
}
