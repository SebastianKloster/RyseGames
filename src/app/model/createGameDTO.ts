import { CategoriaEnum } from "./categoriaEnum";

export interface CreateGameDTO {
    nombre: string;
    fechaLanzamiento: Date;
    precio: number;
    categoria: CategoriaEnum;
    foto: string;
}