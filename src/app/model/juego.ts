import { CategoriaEnum } from "./categoriaEnum";
import { DesarrolladoraModel } from "./desarrolladora";

export interface JuegoModel {
    id: number;
    nombre: string;
    fechaLanzamiento: Date;
    precio: number;
    precioFinal: number;
    porcentajeDescuento: number;
    categoria: CategoriaEnum;
    foto: string;
    desarrolladora: DesarrolladoraModel;
}

