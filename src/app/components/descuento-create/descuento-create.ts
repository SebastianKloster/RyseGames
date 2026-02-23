import { Component, inject, signal } from '@angular/core';
import { DescuentoService } from '../../services/descuento-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JuegoService } from '../../services/juego-service';
import { JuegoDescuentoDTO } from '../../model/juegoDescuentoDTO';

@Component({
  selector: 'app-descuento-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './descuento-create.html',
  styleUrl: './descuento-create.css',
})
export class DescuentoCreate {
  descuentoService = inject(DescuentoService);
  juegoService = inject(JuegoService);
  juegos = signal<JuegoDescuentoDTO[]>([]);
porcentaje = 5;
  fechaInicio!: string;
  fechaFin!: string;
  juegoId!: number;

  mensaje = signal<string | null>(null);
  cargando = signal<boolean>(true);
  dropdownAbierto = false;
juegoSeleccionado: any = null;

toggleDropdown() {
  this.dropdownAbierto = !this.dropdownAbierto;
}

seleccionarJuego(j: any) {
  this.juegoSeleccionado = j;
  this.juegoId = j.id;
  this.dropdownAbierto = false;
}


  ngOnInit() {
    this.juegoService.getByDesarrolladora()
      .subscribe({
        next: (data) => {
          this.juegos.set(data);
          this.cargando.set(false);
        },
        error: () => {
          this.mensaje.set("Error cargando juegos");
          this.cargando.set(false);
        }
      });
  }

  crear() {

    if (!this.juegoId) {
      this.mensaje.set("Seleccioná un juego");
      return;
    }

    const dto = {
      porcentaje: this.porcentaje,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      juegoId: this.juegoId
    };

    this.descuentoService.crearDescuento(dto)
      .subscribe({
        next: () => {
          this.mensaje.set("Descuento creado correctamente 🎮");
        },
        error: (err) => {
          this.mensaje.set(err.error?.message || "Error al crear descuento");
        }
      });
  }
}
