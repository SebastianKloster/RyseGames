import { Component, inject, signal } from '@angular/core';
import { EstadisticasService } from '../../services/estadisticas.service';
import { CommonModule } from '@angular/common';
import { IestadisticasDesarrolladora } from '../../model/estadisticas';

@Component({
  selector: 'app-estadisticas',
  
  imports: [CommonModule],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css',
})
export class Estadisticas {

private estadisticasService = inject(EstadisticasService);
 
estadisticas = signal<IestadisticasDesarrolladora | null>(null);

ngOnInit() {
  this.estadisticasService.refreshEstadisticas().subscribe({
    next: (data) => {
      console.log("DATA COMPLETA:", data);
      this.estadisticas.set(data);
    },
    error: (error) => {
      console.error('Error al obtener las estadísticas:', error);
    }
  });
}


}
