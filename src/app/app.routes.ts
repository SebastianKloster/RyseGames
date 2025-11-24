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
import { CarroList } from './carrito/pages/carro-list/carro-list';
import { Compra } from './compra/pages/compra/compra';
import { Billetera } from './pages/billetera/billetera';
import { Estadisticas } from './pages/estadisticas/estadisticas';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'store', component: Store },
    { path: 'login', component: Login },
    { path: 'register', component: Register},
    { path: 'juegos-desarrolladora', component: JuegosDesarrolladora},
    { path: 'juegos-perfil', component: JuegosPerfil},
    { path: 'juegos-favoritos', component: JuegosFavoritos},
    { path: 'juegos', component: JuegosList},
    { path: 'juegos/:id', component: JuegoDetail },
    // { path: 'create-event', component: CreateEvent },
    // { path: 'create-event/:id', component: CreateEvent },
    {path:'carro', component: CarroList},
    {path: 'compra', component: Compra},
    {path: 'billetera',component: Billetera},
    {path: 'estadisticas', component: Estadisticas},
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la ruta vacía a /home
    { path: '**', redirectTo: '/home' } // Redirige cualquier otra ruta a /home (opcional)
];
