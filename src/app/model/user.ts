import { DesarrolladoraModel } from "./desarrolladora";
import { PerfilModel } from "./perfil";
import { RoleEnum } from "./roleEnum";

export interface UserModel {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
    role: RoleEnum;
    perfil: PerfilModel | null;
    desarrolladora: DesarrolladoraModel | null;
}