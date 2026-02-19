import { Component, computed, inject, signal } from '@angular/core';
import { JuegoService } from '../../services/juego-service';
import { CategoriaEnum } from '../../model/categoriaEnum';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { JuegoModel } from '../../model/juego';
import { Page } from '../../model/page';

@Component({
  selector: 'app-store-list',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './store-list.html',
  styleUrl: './store-list.css',
})
export class StoreList {
  router = inject(Router) //Router: nos permite redireccionar al usuario a otra pagina
  
  juegosService = inject(JuegoService)

  page = signal<Page<JuegoModel> | null>(null);
  juegos = computed(() => this.page()?.content ?? []);

  paginaActual = signal(0);
  loading = signal(false);


  ngOnInit() {
    this.cargarPagina(0);
  }

  cargarPagina(page: number) {
    if (page < 0) return;

    this.loading.set(true);

    this.juegosService.getPage(page).subscribe({
      next: data => {
        this.page.set(data);
        this.paginaActual.set(data.number);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        console.log("Error al intentar cargar la pagina "+page)
      }
    });
  }

  siguiente() { //Siguiente pagina
    const page = this.page();
    if (page && !page.last) {
    this.cargarPagina(this.paginaActual() + 1);
  }
  }

  anterior() { //Pagina anterior
    const page = this.page();
    if (page && !page.first) {
      this.cargarPagina(this.paginaActual() - 1);
    }
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
