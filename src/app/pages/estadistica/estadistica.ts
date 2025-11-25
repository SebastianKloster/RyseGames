import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { EstadisticaModel } from '../../model/estadistica';
import { Subscription } from 'rxjs';
import { JuegoModel } from '../../model/juego';
import { SessionService } from '../../services/session-service';
import { EstadisticaService } from '../../services/estadistica-service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-estadistica',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './estadistica.html',
  styleUrl: './estadistica.css',
})
export class Estadistica {
  estadisticaService = inject(EstadisticaService)

  datos = this.estadisticaService.getEstadisticas()
}
