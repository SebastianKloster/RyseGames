import { RoleEnum } from "./roleEnum";

export interface CreateUserDTO {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    role: RoleEnum;
    nickname: string;
    nombreDesarrolladora: string;
    paisOrigen: string;
}