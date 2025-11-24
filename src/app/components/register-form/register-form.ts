import { Component, inject } from '@angular/core';
import { RoleEnum } from '../../model/roleEnum';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateGameDTO } from '../../model/createGameDTO';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session-service';
import { CreateUserDTO } from '../../model/createUserDTO';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  router = inject(Router)
  roleEnumList = Object.values(RoleEnum)
  roleEnum = RoleEnum

  sessionService = inject(SessionService)

  fb = inject(FormBuilder)
  userForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],

    role: [this.roleEnum.PERFIL, [Validators.required]], //[PERFIL, DESARROLLADORA]

    //Perfil
    nickname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],

    //Desarrolladora
    nombreDesarrolladora: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    paisOrigen: ['', [Validators.required, Validators.minLength(2)]],
  })


  constructor() {
    // escuchar cambios de role para aplicar validadores condicionales
    this.userForm.get('role')!.valueChanges.subscribe(role => {
      this.updateRoleValidators(role);
    });

    // inicializamos validadores segun valor inicial (por si viene prellenado)
    this.updateRoleValidators(this.userForm.get('role')!.value);
  }

  private updateRoleValidators(role: string) {
    const nickname = this.userForm.get('nickname')!;
    const nombreDev = this.userForm.get('nombreDesarrolladora')!;
    const paisOrigen = this.userForm.get('paisOrigen')!;

    // limpiar validadores previos
    nickname.clearValidators();
    nombreDev.clearValidators();
    paisOrigen.clearValidators();

    // si es PERFIL -> nickname requerido
    if (role === this.roleEnum.PERFIL) {
      nickname.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
      // opcional: limpiar otros campos relacionados al rol contrario
      nombreDev.reset('');
      paisOrigen.reset('');
    }

    // si es DESARROLLADORA -> nombreDesarrolladora y paisOrigen requeridos
    if (role === this.roleEnum.DESARROLLADORA) {
      nombreDev.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
      paisOrigen.setValidators([Validators.required, Validators.minLength(2)]);
      // opcional: limpiar campo de perfil
      nickname.reset('');
    }

    // aplicar cambios
    nickname.updateValueAndValidity();
    nombreDev.updateValueAndValidity();
    paisOrigen.updateValueAndValidity();
  }

  handleSubmit() {
    if (this.userForm.valid) {
      this.createUser(this.userForm.getRawValue(), this.userForm.getRawValue().password);
    } else {
      alert("Fomurlario inválido");
    }
  }


  createUser(newUser: CreateUserDTO, password:string){
    this.sessionService.postUser(newUser).subscribe({
      next: (user) => {
        console.log("Usuario registrado:", user);
        this.userForm.reset();
        alert("Usuario registrado con éxito");
        this.sessionService.login(user.email, password)
        this.router.navigate(['/store']);
      },
      error: (err) => {
        alert(err.error.error)
        console.error("Error al registrarse:", err);
      }
    });
  }
}
