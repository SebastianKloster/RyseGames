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
  router = inject(Router); // Router: nos permite redireccionar al usuario a otra pagina

  juegosService = inject(JuegoService);

  // use the public readonly signal exposed by the service
  juegos = this.juegosService.juegos;

  getCategoryColor(categoria: CategoriaEnum | undefined): string {
    if (!categoria) return '#9e9e9e';

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
        return '#43a047'; // Verde
      case CategoriaEnum.MMO:
        return '#26a69a'; // Turquesa claro
      case CategoriaEnum.RPG:
        return '#7e57c2'; // Púrpura claro
      default:
        return '#9e9e9e';
    }
  }

  getCategoryIcon(cat: CategoriaEnum | undefined): string {
    if (!cat) return 'fa-solid fa-question';

    const map: Record<CategoriaEnum, string> = {
      [CategoriaEnum.ACCION]: 'fa-solid fa-gun',
      [CategoriaEnum.ARCADE]: 'fa-solid fa-gamepad',
      [CategoriaEnum.AVENTURA]: 'fa-solid fa-person-hiking',
      [CategoriaEnum.ESTRATEGIA]: 'fa-solid fa-chess',
      [CategoriaEnum.DEPORTE]: 'fa-solid fa-futbol',
      [CategoriaEnum.MMO]: 'fa-solid fa-users',
      [CategoriaEnum.RPG]: 'fa-solid fa-dungeon',
    } as Record<CategoriaEnum, string>;

    return map[cat] ?? 'fa-solid fa-question';
  }

  // Funcion para Testing hasta que implementemos imagenes reales
  getCategoryImage(cat: CategoriaEnum | undefined): string {
    if (!cat) return '';

    const map: Record<CategoriaEnum, string> = {
      [CategoriaEnum.ACCION]: 'https://assets.dev-filo.dift.io/img/2020/09/25/hipertextual-remake-metal-gear-solid-estaria-camino-playstation-5-2020271937_re.jpg',
      [CategoriaEnum.ARCADE]: 'https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/H2x1_NSwitchDS_Tetris99_image1600w.jpg',
      [CategoriaEnum.AVENTURA]: 'https://www.nintendo.com/eu/media/images/assets/nintendo_switch_2_games/thelegendofzeldabreathofthewild_nintendoswitch2edition/2x1_NSwitch2_TLoZTBotWNSwitch2Edition.jpg',
      [CategoriaEnum.ESTRATEGIA]: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/813780/header.jpg?t=1760473253',
      [CategoriaEnum.DEPORTE]: 'https://i.blogs.es/5fe30d/fifa-21-intros_1/1366_521.jpeg',
      [CategoriaEnum.MMO]: 'https://www.yeabitinformatica.com/wp-content/uploads/2020/10/world-of-warcraft-todas-las-expansiones.jpg',
      [CategoriaEnum.RPG]: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/72850/header.jpg?t=1721923139',
    } as Record<CategoriaEnum, string>;

    return map[cat] ?? '';
  }
}

