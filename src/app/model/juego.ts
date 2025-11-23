import { CategoriaEnum } from "./categoriaEnum";
import { DesarrolladoraModel } from "./desarrolladora";

export interface JuegoModel {
    id: number;
    nombre: string;
    fechaLanzamiento: Date;
    precio: number;
    categoria: CategoriaEnum;
    desarrolladora: DesarrolladoraModel;
    foto: string;
}

export interface JuegoVerDTO {
  nombre: string;
  fechaLanzamiento: string;
  precio: number;
  categoria: CategoriaEnum;
  foto: string;
  nombreDesarrolladora: string;
}

export interface JuegoVerDesarrolladoraDTO{
  id: number;
  nombre: string;
  fechaLanzamiento: string;
  precio: number;
  categoria: CategoriaEnum;
  foto: string;
  nombreDesarrolladora: string;
}
