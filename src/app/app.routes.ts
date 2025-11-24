import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Store } from './pages/store/store';
import { Login } from './pages/login/login';
import { CarroList } from './carrito/pages/carro-list/carro-list';
import { Compra } from './compra/pages/compra/compra';
import { Billetera } from './pages/billetera/billetera';
import { Estadisticas } from './pages/estadisticas/estadisticas';

export const routes: Routes = [    
    { path: 'home', component: Home },
    { path: 'store', component: Store },
    { path: 'login', component: Login },
    {path:'carro', component: CarroList},
    {path: 'compra', component: Compra},
    {path: 'billetera',component: Billetera},
    {path: 'estadisticas', component: Estadisticas},
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige la ruta vacía a /home
    { path: '**', redirectTo: '/home' } // Redirige cualquier otra ruta a /home (opcional)
];
