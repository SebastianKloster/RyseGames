import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Store } from './pages/store/store';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { JuegosDesarrolladora } from './pages/juegos-desarrolladora/juegos-desarrolladora';
import { JuegosPerfil } from './pages/juegos-perfil/juegos-perfil';
import { JuegosFavoritos } from './pages/juegos-favoritos/juegos-favoritos';
import { CarroList } from './carrito/pages/carro-list/carro-list';
import { Compra } from './compra/pages/compra/compra';
import { Billetera } from './pages/billetera/billetera';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'store', component: Store },
    { path: 'login', component: Login },
    { path: 'register', component: Register},
    { path: 'juegos-desarrolladora', component: JuegosDesarrolladora},
    { path: 'juegos-perfil', component: JuegosPerfil},
    { path: 'juegos-favoritos', component: JuegosFavoritos},
    // { path: 'create-event', component: CreateEvent },
    // { path: 'create-event/:id', component: CreateEvent },
    {path:'carro', component: CarroList},
    {path: 'compra', component: Compra},
    {path: 'billetera',component: Billetera},
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la ruta vacía a /home
    { path: '**', redirectTo: '/home' } // Redirige cualquier otra ruta a /home (opcional)
];
