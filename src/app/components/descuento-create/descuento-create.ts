import { Component, inject, signal } from '@angular/core';
import { DescuentoService } from '../../services/descuento-service';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { JuegoService } from '../../services/juego-service';
import { JuegoDescuentoDTO } from '../../model/juegoDescuentoDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaEnum } from '../../model/categoriaEnum';
import { CreateGameDTO } from '../../model/createGameDTO';
import { JuegoModel } from '../../model/juego';
import { DescuentoDTO } from '../../model/descuentoDTO';

@Component({
  selector: 'app-descuento-create',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './descuento-create.html',
  styleUrl: './descuento-create.css',
})
export class DescuentoCreate {
  route = inject(ActivatedRoute)
  router = inject(Router)
  juegoService = inject(JuegoService)
  descuentoService = inject(DescuentoService)

  juego = signal<JuegoModel | null>(null);

  loading = signal(false);

  minDateTime = this.toDateTimeLocal(new Date());


  fb = inject(FormBuilder);
  descuentoForm = this.fb.nonNullable.group({
    porcentaje: [5, [Validators.required, Validators.min(5), Validators.max(100)]],
    fechaInicio: [this.toDateTimeLocal(new Date()), [Validators.required]],
    fechaFin: [this.toDateTimeLocal(new Date()), [Validators.required]]
  }, {
    validators: descuentoFechasValidator() //Validador de fechas
  });


  ngOnInit() {
    const idParam = Number(this.route.snapshot.paramMap.get('id'));

    if (idParam) {
      this.loading.set(true)

      this.juegoService.getJuegoById(idParam).subscribe({
        next: juego => {
          this.juego.set(juego);
          this.loading.set(false)
        }
      });
    };
  }




  handleSubmit() {
    if (this.descuentoForm.valid) {
      this.crearDescuento(this.descuentoForm.getRawValue())
    } else {
      alert("Fomurlario inválido");
    }
  }

  crearDescuento(data:any){
    let descuento:DescuentoDTO = {...data, juegoId: this.juego()?.id}


    this.descuentoService.crearDescuento(descuento).subscribe({
      next: () => {
        alert("Descuento creado con exito")
        this.descuentoForm.reset();
        this.router.navigate(['/store']);
      },
      error: (err) => {
        alert("Error al crear el descuento" + err.error)
        console.error("Error al crear el descuento:", err);
      }
    });
  }

  private toDateTimeLocal(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`
        + `T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
  
}





function descuentoFechasValidator(): ValidatorFn { // Funcion para validar las fechas
    return (form: AbstractControl): ValidationErrors | null => {

      const inicio = form.get('fechaInicio')?.value;
      const fin = form.get('fechaFin')?.value;

      if (!inicio || !fin) return null;

      const now = new Date();
      const fechaInicio = new Date(inicio);
      const fechaFin = new Date(fin);

      if (fechaInicio < now) {
        return { inicioPasado: true };
      }

      if (fechaFin <= fechaInicio) {
        return { finAnterior: true };
      }

      return null;
    };
  }













//   descuentoService = inject(DescuentoService);
//   juegoService = inject(JuegoService);
//   juegos = signal<JuegoDescuentoDTO[]>([]);
  
//   porcentaje = 5;
//   fechaInicio!: string; 
//   fechaFin!: string;
//   juegoId!: number;

//   mensaje = signal<string | null>(null);
//   cargando = signal<boolean>(true);
//   dropdownAbierto = false;
//   juegoSeleccionado: any = null;

// toggleDropdown() {
//   this.dropdownAbierto = !this.dropdownAbierto;
// }

// seleccionarJuego(j: any) {
//   this.juegoSeleccionado = j;
//   this.juegoId = j.id;
//   this.dropdownAbierto = false;
// }


//   ngOnInit() {
//     this.juegoService.getByDesarrolladora()
//       .subscribe({
//         next: (data) => {
//           this.juegos.set(data);
//           this.cargando.set(false);
//         },
//         error: () => {
//           this.mensaje.set("Error cargando juegos");
//           this.cargando.set(false);
//         }
//       });
//   }

//   crear() {

//     if (!this.juegoId) {
//       this.mensaje.set("Seleccioná un juego");
//       return;
//     }

//     const dto = {
//       porcentaje: this.porcentaje,
//       fechaInicio: this.fechaInicio,
//       fechaFin: this.fechaFin,
//       juegoId: this.juegoId
//     };

//     this.descuentoService.crearDescuento(dto)
//       .subscribe({
//         next: () => {
//           this.mensaje.set("Descuento creado correctamente 🎮");
//         },
//         error: (err) => {
//           console.log(err)
//           this.mensaje.set(err.error?.message || "Error al crear descuento");
//         }
//       });
//   }
