import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JuegoService } from '../../services/juego-service';
import { Router } from '@angular/router';
import { JuegoCreateDTO, JuegoUpdateDTO } from '../../model/juego';
import { CategoriaEnum } from '../../model/categoriaEnum';

@Component({
  selector: 'app-juego-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './juego-form.html',
  styleUrl: './juego-form.css',
})
export class JuegoForm {
  categorias = Object.values(CategoriaEnum);

  private fb = inject(FormBuilder);
  juegoService = inject(JuegoService);

  isEditMode = signal(false);
  private juegoToEdit: JuegoUpdateDTO | null = null;
  private router = inject(Router);

  form = this.fb.nonNullable.group(
    {
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      fechaLanzamiento: ['',[Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      precio: [0, [Validators.required, Validators.min(0), Validators.max(999999)]],
      categoria: [CategoriaEnum.ACCION,Validators.required],
      foto: ['', [Validators.required]]
    }
  )

  constructor(){
    effect(()=>{
      this.juegoToEdit=this.juegoService.juegoToEdit();
      if(this.juegoToEdit){
        this.isEditMode.set(true);
        this.form.patchValue({
          nombre: this.juegoToEdit.nombre,
          fechaLanzamiento: this.juegoToEdit.fechaLanzamiento,
          precio: this.juegoToEdit.precio,
          categoria: this.juegoToEdit.categoria,
          foto: this.juegoToEdit.foto
        });
      } else{
        this.isEditMode.set(false);
        this.form.reset();
      }
        });
      }

  saveJuego(){
    if(this.form.invalid){
      return;
    }

    const formValue : JuegoCreateDTO = this.form.getRawValue();

    if(this.isEditMode() && this.juegoToEdit){
      const updatedJuego = {...this.juegoToEdit,...formValue};
      this.juegoService.update(updatedJuego).subscribe(()=>{
        console.log('Juego actualizado con exito');
        this.juegoService.clearJuegoToEdit();
        this.redirect();
      });
    } else{
      this.juegoService.postJuego(formValue).subscribe(()=>{
        console.log('Juego creado con exito');
        this.form.reset();
        this.redirect();
      });
    }
  }

  cancelEdit(){
    this.juegoService.clearJuegoToEdit();
    this.redirect();
  }

  redirect(){
    this.router.navigate(['/juegos']);
  }
}




