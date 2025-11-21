import { CategoriaEnum } from "./categoriaEnum";

export interface JuegoModel {
    id: number;
    nombre: string;
    fechaLanzamiento: string;
    precio: number;
    categoria: CategoriaEnum;
    foto: string;
    desarrolladora: string;
}

export interface JuegoCreateDTO {
  nombre: string;
  fechaLanzamiento: string;
  precio: number;
  categoria: CategoriaEnum;
  foto: string;
}

export interface JuegoUpdateDTO {
  id: number;
  nombre?: string;
  fechaLanzamiento?: string;
  precio?: number;
  categoria?: CategoriaEnum;
  foto?: string;
}


export interface JuegoVerDTO{
    nombre: string;
    fechaLanzamiento: string;
    precio: number;
    categoria: CategoriaEnum;
    foto: string;
    nombreDesarrolladora: string;
}
