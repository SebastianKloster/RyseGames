import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Store } from './pages/store/store';
import { JuegoForm } from './juegos/pages/juego-form/juego-form';
import { JuegoList } from './juegos/pages/juego-list/juego-list';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'store', component: Store },
    { path:'crear-juego', component: JuegoForm},
    // { path: 'create-event', component: CreateEvent },
    // { path: 'create-event/:id', component: CreateEvent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la ruta vacía a /home
    { path: '**', redirectTo: '/home' }, // Redirige cualquier otra ruta a /home (opcional)
    { path: 'juegos-propios', component: JuegoList},
    { path: 'edit', component: JuegoForm}
];
