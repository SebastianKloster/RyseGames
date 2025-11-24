import { Role } from "./role";

export interface UserVerDTO {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
    role: Role;
    nickName: string;
    nombreDesarrolladora: string;
}

export interface UserModel {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    role: Role;
    nickName?: string;
    nombreDesarrolladora?: string;
    paisOrigen?: string;
}

export interface UserUpdateDTO {
  id?:number;
  nombre?: string;
  apellido?: string;
  password?: string;
  nickName?: string;
  nombreDesarrolladora?: string;
  paisOrigen?: string;
}
