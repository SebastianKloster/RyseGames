import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserUpdateDTO, UserVerDTO } from '../../model/user';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../services/session-service';

@Component({
  selector: 'app-user-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit{
fb = inject(FormBuilder);
  session = inject(SessionService);
  userService = inject(UserService);
  router = inject(Router);


  user = computed(() => this.session.currentUser());

  form: FormGroup;

  constructor() {

    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      password: ['', Validators.minLength(3)]
    });


    effect(() => {
      const u = this.user();
      if (u) {
        this.form.patchValue({
          nombre: u.nombre,
          apellido: u.apellido
        });
      }
    });
  }

  save() {
    const u = this.user();
    if (!u || this.form.invalid) return;

    const dto: UserUpdateDTO = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      password: this.form.value.password || undefined
    };

    this.userService.update(dto).subscribe({
  next: (updatedUser) => {
    const current = this.user()!;
    this.session.currentUser.set({ ...current, ...updatedUser });
    alert('Usuario actualizado');
  },
  error: (err) => {
    console.error(err);
    alert('Error al actualizar el usuario');
  }
});
  }
}
