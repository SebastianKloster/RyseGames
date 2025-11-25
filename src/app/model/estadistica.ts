import { JuegoModel } from "./juego";

export interface EstadisticaModel {
    juego:JuegoModel;
    ventas:number;
    favoritos:number;
}