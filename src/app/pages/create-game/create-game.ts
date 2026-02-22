import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateGameDTO } from '../../model/createGameDTO';
import { JuegoService } from '../../services/juego-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaEnum } from '../../model/categoriaEnum';
import { JuegoModel } from '../../model/juego';

@Component({
  selector: 'app-create-game',
  imports: [ReactiveFormsModule],
  templateUrl: './create-game.html',
  styleUrl: './create-game.css',
})
export class CreateGame {
  route = inject(ActivatedRoute)
  router = inject(Router)
  juegoService = inject(JuegoService)
  
  categoriaEnum = Object.values(CategoriaEnum)
  
  isEditing = signal(false)
  juego = signal<JuegoModel | null>(null);

  loading = signal(false);

  
  fb = inject(FormBuilder);
  gameForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required,Validators.minLength(2) , Validators.maxLength(50)]],
    fechaLanzamiento: [new Date(), [Validators.required]],
    precio: [0, [Validators.required, Validators.min(0), Validators.max(999999999)]],
    categoria: [CategoriaEnum.ACCION, [Validators.required]],
    foto: ['', [Validators.required]],
  })


  ngOnInit() {
    const idParam = Number(this.route.snapshot.paramMap.get('id'));
 
    if (idParam) {
      this.loading.set(true)
      this.isEditing.set(true)
      
      this.juegoService.getJuegoById(idParam).subscribe({
        next: juego => {
          this.juego.set(juego);
          this.patchForm(juego);
          this.loading.set(false)
        }
      });
    };
  }




  handleSubmit() {
    if (this.gameForm.valid) {
      if (this.isEditing()) {
        this.updateGame(this.gameForm.getRawValue())
        // alert("Evento editado con éxito");
      } else {
        this.createGame(this.gameForm.getRawValue());
        // alert("Juego creado con éxito");
      }
      // this.router.navigate(['/store']);
    } else {
      alert("Fomurlario inválido");
    }
  }


  createGame(newGame: CreateGameDTO){
    this.juegoService.postGame(newGame).subscribe({
      next: (game) => {
        alert("Juego creado con exito")
        console.log("Juego creado:", game);
        this.gameForm.reset();
        this.router.navigate(['/store']);
      },
      error: (err) => {
        alert(err.error.error)
        console.error("Error al crear el juego:", err);
      }
    });
  }

  updateGame(newGame: CreateGameDTO){
    const gameObject:JuegoModel = {...newGame, id: this.juego()!.id, desarrolladora: this.juego()!.desarrolladora};

    this.juegoService.updateGame(gameObject).subscribe({
      next: (game) => {
        alert("Juego editado con exito")
        console.log("Juego editado:", game);
        this.gameForm.reset();
        this.router.navigate(['/store']);
      },
      error: (err) => {
        alert(JSON.stringify(err.error))
        console.error("Error al editar el juego:", err);
      }
    });
  }

  //Metodo para patchear el formulario con el juego a actualizar
  private patchForm(juego: JuegoModel) {
  this.gameForm.patchValue({
    nombre: juego.nombre,
    fechaLanzamiento: juego.fechaLanzamiento,
    precio: juego.precio,
    categoria: juego.categoria,
    foto: juego.foto,
  });
}
}
