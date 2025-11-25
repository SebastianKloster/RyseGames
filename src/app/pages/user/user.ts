import { Component, effect, inject } from '@angular/core';
import { SessionService } from '../../services/session-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserDTO } from '../../model/createUserDTO';
import { RoleEnum } from '../../model/roleEnum';
import { UserModel } from '../../model/user';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  router = inject(Router);
  fb = inject(FormBuilder);
  sessionService = inject(SessionService);

  // asumimos que getLoggedUser() devuelve signal<UserModel | null>
  user = this.sessionService.getLoggedUser();

  userForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    // password opcional en update
    password: ['', [Validators.minLength(3), Validators.maxLength(50)]]
  });

  constructor() {
    // parchear el formulario cada vez que cambie la señal user()
    effect(() => {
      const u = this.user();
      if (!u) return;

      this.userForm.patchValue({
        nombre: u.nombre ?? '',
        apellido: u.apellido ?? '',
        password: '' // vacío por defecto para no forzar cambio
      });
    });
  }

  handleSubmit() {
    if (!this.userForm.valid) {
      alert('Formulario inválido');
      return;
    }

    const currentUser = this.user();
    if (!currentUser) {
      alert('No se encontró el usuario logueado');
      return;
    }

    const raw = this.userForm.getRawValue();

    // construir DTO: incluir id (si tu backend lo necesita) y sólo campos que acepta UserUpdateDTO
    const payload: any = {
      nombre: raw.nombre,
      apellido: raw.apellido
    };

    // si password no está vacío, lo incluimos; si está vacío lo omitimos
    if (raw.password && raw.password.trim().length > 0) {
      payload.password = raw.password;
    }

    // Llamada al servicio
    this.sessionService.updateUser(payload as any) // ajustá el tipo si tenés un DTO TS
      .pipe(take(1))
      .subscribe({
        next: (updatedUser) => {
          alert('Usuario actualizado con éxito');
          // si SessionService tiene un método para actualizar la señal:
          if (typeof (this.sessionService as any).setLoggedUser === 'function') {
            try { (this.sessionService as any).setLoggedUser(updatedUser); } catch {}
          }
          this.sessionService.logout();
        },
        error: (err) => {
          console.error('Error actualizando usuario', err);
          alert(err.error.error ?? 'Error al actualizar usuario');
        }
      });
  }
}
