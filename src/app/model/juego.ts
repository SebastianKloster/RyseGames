import { CategoriaEnum } from "./categoriaEnum";
import { DesarrolladoraModel } from "./desarrolladora";

export interface JuegoModel {
    id: number;
    nombre: string;
    fechaLanzamiento: Date;
    precio: number;
    categoria: CategoriaEnum;
    desarrolladora: DesarrolladoraModel;
    portada: string;
}