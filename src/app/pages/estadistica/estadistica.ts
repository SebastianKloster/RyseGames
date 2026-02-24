import { Component, inject, signal } from '@angular/core';
import { EstadisticaService } from '../../services/estadistica-service';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-estadistica',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './estadistica.html',
  styleUrl: './estadistica.css',
})
export class Estadistica {
  router = inject(Router)
  estadisticaService = inject(EstadisticaService)

  datos = this.estadisticaService.getEstadisticas()

  goToCreateGame() {
    this.router.navigate(['/create_game'])
  }

  goToEditGame(id:number){
    this.router.navigate(['/game/update/'+id])
  }
  goToDescuento(id:number){
    this.router.navigate(['/descuento-create/'+id])
  }
}
