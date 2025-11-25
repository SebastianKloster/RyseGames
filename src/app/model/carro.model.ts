export interface IJuegoToCarro {
  idJuego: number;
  nombre: string;
  precio: number;
  foto: string;
}
export interface ICarroDeCompras {
  idCarrito: number;
  juegos: IJuegoToCarro[];
}