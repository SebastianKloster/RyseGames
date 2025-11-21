import { CategoriaEnum } from "./categoriaEnum";

export interface JuegoModel {
    id: number;
    nombre: string;
    fechaLanzamiento: Date;
    precio: number;
    categoria: CategoriaEnum;
    desarrolladora: string;
}