import { CategoriaEnum } from "./categoriaEnum";

export interface CreateGameDTO {
    nombre: string;
    fechaLanzamiento: Date;
    precio: Number;
    categoria: CategoriaEnum;
    foto: string;
}