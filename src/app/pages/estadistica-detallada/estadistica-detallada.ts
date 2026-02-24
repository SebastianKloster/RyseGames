import { Component, computed, inject, signal } from '@angular/core';
import { DesarrolladoraStatsDTO, SeriePointDTO } from '../../model/estadisticaDetalla';
import { EstadisticaDetalladaService } from '../../services/estadistica-detallada-service';
import { CategoriaEnum } from '../../model/categoriaEnum';

@Component({
  selector: 'app-estadistica-detallada',
  imports: [],
  templateUrl: './estadistica-detallada.html',
  styleUrl: './estadistica-detallada.css',
})
export class EstadisticaDetallada {
  private statsService = inject(EstadisticaDetalladaService);
  Math = Math;

  days = signal(30);
  loading = signal(true);
  error = signal<string | null>(null);
  stats = signal<DesarrolladoraStatsDTO | null>(null);

  // Derivados
  retencionPct = computed(() => {
    const s = this.stats();
    if (!s) return 0;
    return Math.round(s.tasaRetencionSimple * 100);
  });

  totalJuegosCatalogo = computed(() => {
    const s = this.stats();
    if (!s) return 0;
    return s.distribucionCategorias.reduce((acc, c) => acc + c.cantidad, 0);
  });

  // Para SVG charts
  ventasSerie = computed(() => this.stats()?.ventasPorDia ?? []);
  ingresosSerie = computed(() => this.stats()?.ingresosPorDia ?? []);

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);

    this.statsService.getDashboard(this.days()).subscribe({
      next: (data) => {
        this.stats.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err)
        this.error.set(err?.error?.message ?? 'No se pudieron cargar las estadísticas');
        this.loading.set(false);
      }
    });
  }

  setDays(d: number) {
    this.days.set(d);
    this.load();
  }

  // Helpers de UI
  money(v: number | null | undefined) {
    const n = Number(v ?? 0);
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n);
  }

  // --- SVG chart helpers (sin librerías) ---
  // Genera el "path" de una línea.
  linePath(series: SeriePointDTO[], width = 640, height = 160, padding = 16): string {
    if (!series.length) return '';

    const values = series.map(p => Number(p.valor));
    const minV = Math.min(...values);
    const maxV = Math.max(...values);
    const range = Math.max(1e-9, maxV - minV);

    const innerW = width - padding * 2;
    const innerH = height - padding * 2;

    const x = (i: number) => padding + (innerW * i) / Math.max(1, series.length - 1);
    const y = (v: number) => padding + innerH - (innerH * (v - minV)) / range;

    let d = `M ${x(0)} ${y(values[0])}`;
    for (let i = 1; i < values.length; i++) {
      d += ` L ${x(i)} ${y(values[i])}`;
    }
    return d;
  }

  // Etiquetas del eje (min/max)
  minMax(series: SeriePointDTO[]): { min: number; max: number } {
    if (!series.length) return { min: 0, max: 0 };
    const values = series.map(p => Number(p.valor));
    return { min: Math.min(...values), max: Math.max(...values) };
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