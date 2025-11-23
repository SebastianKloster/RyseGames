import { JuegoModel } from "./juego";
import { UserVerDTO } from "./user";

export interface PerfilModel {
  id: number;
  nickName: string;
  billetera: BilleteraModel;
  user: UserVerDTO;
  juegos: JuegoModel[];
  favoritos: JuegoModel[];
}

export interface BilleteraModel {
  id: number;
  saldo: number;
}

export interface PerfilUpdateDTO {
  nickName: string;
}
