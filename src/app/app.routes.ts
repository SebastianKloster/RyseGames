import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Store } from './pages/store/store';
import { Login } from './pages/login/login';
import { Game } from './pages/game/game';
import { CreateGame } from './pages/create-game/create-game';
import { Biblioteca } from './pages/biblioteca/biblioteca';
import { Register } from './pages/register/register';
import { Billetera } from './pages/billetera/billetera';

export const routes: Routes = [    
    { path: 'home', component: Home },
    { path: 'store', component: Store },
    { path: 'login', component: Login },
    { path: 'biblioteca', component: Biblioteca },
    { path: 'game/:id', component: Game },
    { path: 'game/update/:id', component: CreateGame },
    { path: 'create_game', component: CreateGame },
    { path: 'register', component: Register },
    { path: 'billetera', component: Billetera },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la ruta vacía a /home
    { path: '**', redirectTo: '/home' } // Redirige cualquier otra ruta a /home (opcional)
];
