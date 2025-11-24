import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Store } from './pages/store/store';
import { Login } from './pages/login/login';
import { Game } from './pages/game/game';

export const routes: Routes = [    
    { path: 'home', component: Home },
    { path: 'store', component: Store },
    { path: 'login', component: Login },
    { path: 'game/:id', component: Game },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la ruta vacía a /home
    { path: '**', redirectTo: '/home' } // Redirige cualquier otra ruta a /home (opcional)
];
