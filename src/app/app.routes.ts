import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Store } from './pages/store/store';
import { Login } from './pages/login/login';
import { Game } from './pages/game/game';
import { CreateGame } from './pages/create-game/create-game';
import { Biblioteca } from './pages/biblioteca/biblioteca';
import { Register } from './pages/register/register';
import { Billetera } from './pages/billetera/billetera';
import { User } from './pages/user/user';
import { authGuardFnLogin } from './auth/authGuardFnLogin';
import { authGuardFn } from './auth/auth.guard';
import { AccessDenied } from './pages/access-denied/access-denied';
import { Estadistica } from './pages/estadistica/estadistica';
import { WalletOk } from './pages/wallet-ok/wallet-ok';
import { WalletPending } from './pages/wallet-pending/wallet-pending';
import { WalletError } from './pages/wallet-error/wallet-error';
import { DescuentoCreate } from './components/descuento-create/descuento-create';
export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'store', component: Store },
    { path: 'login', component: Login},
    { path: 'biblioteca', component: Biblioteca , canActivate: [authGuardFn], data:  { roles: ['PERFIL'] }},
    { path: 'game/:id', component: Game },
    { path: 'game/update/:id', component: CreateGame , canActivate: [authGuardFn], data: {roles: ['DESARROLLADORA']}},
    { path: 'create_game', component: CreateGame, canActivate: [authGuardFn], data: {roles: ['DESARROLLADORA']}},
    { path: 'register', component: Register, canActivate: [authGuardFnLogin]},
    { path: 'billetera', component: Billetera, canActivate: [authGuardFn], data:  { roles: ['PERFIL'] }},
    {path: 'access-denied',component: AccessDenied},
    { path: 'user', component: User },
    { path: 'estadisticas', component: Estadistica , canActivate: [authGuardFn], data: {roles: ['DESARROLLADORA']}},
    { path: 'wallet-ok', component:WalletOk},
    {path: 'wallet-pending', component:WalletPending},
    {path: 'wallet-error', component:WalletError},
    // {path: 'descuento-create', component: DescuentoCreate, canActivate: [authGuardFn], data: {roles: ['DESARROLLADORA']}},
    {path: 'descuento-create/:id', component: DescuentoCreate, canActivate: [authGuardFn], data: {roles: ['DESARROLLADORA']}},
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la ruta vacía a /home
    { path: '**', redirectTo: '/home' } // Redirige cualquier otra ruta a /home (opcional)
];
