import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { JuegoService } from '../../services/juego-service';
import { CategoriaEnum } from '../../model/categoriaEnum';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { JuegoModel } from '../../model/juego';
import { Page } from '../../model/page';
import { combineLatest, debounceTime, merge, skip, switchMap, take, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

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
  loading = signal(true);

  search = signal('');

  private base$ = combineLatest([ //Trigers para actualizar la busqueda
    toObservable(this.paginaActual),
    toObservable(this.search)
  ]);
  private firstLoad$ = this.base$.pipe( //Carga incial, sin debounce 
    take(1)
  );
  private changes$ = this.base$.pipe( //Carga tras cambios del usuario -> debounce
    skip(1),
    debounceTime(400)
  );

  private trigger$ = merge( //Realizar la peticion
    this.firstLoad$,
    this.changes$
  ).pipe(
    tap(() => this.loading.set(true)),
    switchMap(([page, search]) =>
      //Argumentos: paginacion, categoria, texto de busqueda.
      this.juegosService.getPage(page, undefined, search) 
    )
  );


  readonly scrollEffect = effect(() => { //Scrollear al tope al pasar de pagina
    const page = this.paginaActual();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  readonly resetPageOnSearchEffect = effect(() => { //Volver a la primera pagina al cambiar parametros de busqueda
    const search = this.search(); // 👈 única dependencia

    untracked(() => { //Untracked evita que el effect actue sobre cambios en el singal 'paginaActual' (evitando así bucles)
      if (this.paginaActual() !== 0) {
        this.paginaActual.set(0);
      }
    });
  });


  ngOnInit() {
    this.trigger$.subscribe({
      next: data => {
        this.page.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        console.error("Error cargando página");
      }
    });
  }
  

  siguiente() { //Siguiente pagina
    if (this.loading()) return;
    
    const page = this.page();
    if (page && !page.last) {
      if (this.paginaActual() >= page.totalPages - 1) {
        return
      }
      this.paginaActual.set(this.paginaActual() + 1);
    }
  }

  anterior() { //Pagina anterior
    if (this.loading()) return;

    const page = this.page();
    if (page && !page.first) {
      if (this.paginaActual() < 1) {
        return
      }
      this.paginaActual.set(this.paginaActual() - 1);
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
