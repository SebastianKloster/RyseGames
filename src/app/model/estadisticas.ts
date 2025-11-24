export interface IventaJuego {
    juegoId: number;
    juegoNombre: string;
    cantidadVendida: number;
}

export interface IestadisticasDesarrolladora {
    juegoMasVendido: IventaJuego;
    ventasPorJuego: IventaJuego[];
    gananciasTotales: number;
}
