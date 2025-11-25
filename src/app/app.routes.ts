import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Store } from './pages/store/store';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { JuegosDesarrolladora } from './pages/juegos-desarrolladora/juegos-desarrolladora';
import { JuegosPerfil } from './pages/juegos-perfil/juegos-perfil';
import { JuegosFavoritos } from './pages/juegos-favoritos/juegos-favoritos';
import { JuegosList } from './pages/juegos-list/juegos-list';
import { JuegoDetail } from './pages/juego-detail/juego-detail';
import { CarroList } from './pages/carro-list/carro-list';
import { Compra } from './pages/compra/compra';
import { Billetera } from './pages/billetera/billetera';
import { authGuardFn } from './auth/authGuardFn';
import { authGuardFnLogin } from './auth/authGuardFnLogin';
import { AccessDenied } from './pages/access-denied/access-denied';
import { Estadisticas } from './pages/estadisticas/estadisticas';
import { UserDetail } from './pages/user-detail/user-detail';
import { UserEdit } from './pages/user-edit/user-edit';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'store', component: Store },
    { path: 'login', component: Login, canActivate: [authGuardFnLogin] },
    { path: 'register', component: Register, canActivate: [authGuardFnLogin]},

    { path: 'user/profile', component: UserDetail , canActivate: [authGuardFn]},
    { path: 'user/edit/:id', component: UserEdit , canActivate: [authGuardFn]},

    { path: 'juegos-desarrolladora', component: JuegosDesarrolladora, canActivate: [authGuardFn],data: { roles: ['DESARROLLADORA'] }},
     {path: 'juegos-perfil',component: JuegosPerfil,canActivate: [authGuardFn],data: { roles: ['PERFIL'] }},

    { path: 'juegos-favoritos', component: JuegosFavoritos, canActivate: [authGuardFn],data: { roles: ['PERFIL'] }},
    { path: 'juegos', component: JuegosList},
    { path: 'juegos/:id', component: JuegoDetail },
    // { path: 'create-event', component: CreateEvent },
    // { path: 'create-event/:id', component: CreateEvent },
    {path:'carro', component: CarroList, canActivate: [authGuardFn],data: { roles: ['PERFIL'] }},
    {path: 'compra', component: Compra, canActivate: [authGuardFn],data: { roles: ['PERFIL'] }},
    {path: 'billetera',component: Billetera, canActivate: [authGuardFn],data: { roles: ['PERFIL'] }},
    {path: 'access-denied',component: AccessDenied},
    {path: 'estadisticas', component: Estadisticas, canActivate: [authGuardFn], data: { roles: ['DESARROLLADORA']}},
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la ruta vacía a /home
    { path: '**', redirectTo: '/home' } // Redirige cualquier otra ruta a /home (opcional)
];
