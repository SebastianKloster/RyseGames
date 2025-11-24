import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateGameDTO } from '../../model/createGameDTO';
import { JuegoService } from '../../services/juego-service';
import { Router } from '@angular/router';
import { CategoriaEnum } from '../../model/categoriaEnum';

@Component({
  selector: 'app-create-game',
  imports: [ReactiveFormsModule],
  templateUrl: './create-game.html',
  styleUrl: './create-game.css',
})
export class CreateGame {
  router = inject(Router)
  juegoService = inject(JuegoService)
  
  categoriaEnum = Object.values(CategoriaEnum)
  
  
  fb = inject(FormBuilder);
  gameForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    fechaLanzamiento: [[Validators.required]],
    precio: [0, [Validators.required, Validators.min(0), Validators.max(999999999)]],
    categoria: [[Validators.required]],
    foto: ['', [Validators.required]],
  })

  handleSubmit() {
    if (this.gameForm.valid) {

      this.createGame(this.gameForm.getRawValue());

      alert("Juego creado con éxito");
      this.router.navigate(['/store']);

    } else {
      alert("Fomurlario inválido");
    }
  }


  createGame(newGame: CreateGameDTO){
    this.juegoService.postGame(newGame).subscribe({
      next: (game) => {
        console.log("Juego creado:", game);
        this.gameForm.reset();
      },
      error: (err) => {
        console.error("Error al crear el juego:", err);
      }
    });
  }
}
