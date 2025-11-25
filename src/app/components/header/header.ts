import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,MatTabsModule,MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {



constructor(private router: Router) {}
  selectedTab = 0;

tabChange(i: number) {
  this.selectedTab = i;
  if (i === 0) this.router.navigate(['/store']);
  if (i === 1) this.router.navigate(['/crear-juego']);
  if (i === 2) this.router.navigate(['/login']);
  if (i === 3) this.router.navigate(['/carro']);
}


}

