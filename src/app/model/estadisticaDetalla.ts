import { CategoriaEnum } from "./categoriaEnum";

export interface SeriePointDTO {
  dia: string;   // "YYYY-MM-DD"
  valor: number;
}

export interface CategoriaCountDTO {
  categoria: CategoriaEnum;
  cantidad: number;
}

export interface DesarrolladoraStatsDTO {
  ventasTotales: number;
  ingresosTotales: number;

  ventasPeriodo: number;
  ingresosPeriodo: number;

  ventasPorDia: SeriePointDTO[];
  ingresosPorDia: SeriePointDTO[];

  precioPromedio: number;
  precioMediana: number;

  distribucionCategorias: CategoriaCountDTO[];

  compradoresUnicos: number;
  compradoresRecurrentes: number;
  tasaRetencionSimple: number; // 0..1
}