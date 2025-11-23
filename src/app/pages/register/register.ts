import { Component, effect, inject, signal } from '@angular/core';
import { Role } from '../../model/role';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { UserModel, UserUpdateDTO } from '../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  roles = Object.values(Role);

  private fb = inject(FormBuilder);
  userService = inject(UserService);

  isEditMode = signal(false);
  private userToEdit: UserUpdateDTO | null = null;
  private router = inject(Router);

  form = this.fb.nonNullable.group(
    {
      nombre: ['', [Validators.required, Validators.maxLength(50),Validators.minLength(2)]],
      apellido: ['',[Validators.required, Validators.maxLength(50),Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: [Role.Perfil, Validators.required],

      nickname: [''],
      nombreDesarrolladora: [''],
      paisOrigen: ['']
    }
  )

  constructor(){
  effect(()=>{
    this.userToEdit=this.userService.userToEdit();
    if(this.userToEdit){
      this.isEditMode.set(true);
      this.form.patchValue({
        nombre: this.userToEdit?.nombre,
        apellido: this.userToEdit?.apellido,
        password: this.userToEdit?.password,
        nickname: this.userToEdit?.nickName,
        nombreDesarrolladora: this.userToEdit?.nombreDesarrolladora,
        paisOrigen: this.userToEdit?.paisOrigen,
      });
    } else{
      this.isEditMode.set(false);
      this.form.reset();
    }

    this.updateValidatorByRole(this.form.get('role')!.value!);
  });

  this.form.get('role')?.valueChanges.subscribe(role => {
      this.updateValidatorByRole(role as Role);
    });
  }


  updateValidatorByRole(role: Role){
    const nickName = this.form.get('nickname');
    const nombreDesarrolladora = this.form.get('nombreDesarrolladora');
    const paisOrigen = this.form.get('paisOrigen');

    nickName?.clearValidators();
    nombreDesarrolladora?.clearValidators();
    paisOrigen?.clearValidators();

    if(role === Role.Perfil){
      nickName?.setValidators([Validators.required,Validators.maxLength(50),Validators.minLength(2)]);
    }

    if(role === Role.Desarrolladora){
      nombreDesarrolladora?.setValidators([Validators.required,Validators.maxLength(50),Validators.minLength(2)]);
      paisOrigen?.setValidators([Validators.required,Validators.maxLength(50),Validators.minLength(2)]);
    }

    nickName?.updateValueAndValidity();
    nombreDesarrolladora?.updateValueAndValidity();
    paisOrigen?.updateValueAndValidity();
  }


  saveUser(){
  if(this.form.invalid){
    return;
  }

  const formValue: UserModel = this.form.getRawValue();

  if(this.isEditMode() && this.userToEdit){
    const updatedUser = {...this.userToEdit, ... formValue};
    this.userService.update(updatedUser).subscribe(()=>{
      console.log('Usuario actualizado con exito');
      this.userService.clearUserToEdit();
      this.redirect();
    });
  } else{
    this.userService.postUser(formValue).subscribe(()=>{
      console.log('Usuario creado con exito');
      this.form.reset({role: Role.Perfil});
      this.redirect();
    })
  }
  }

  cancelEdit(){
    this.userService.clearUserToEdit();
    this.redirect();
  }
  redirect(){
    this.router.navigate(['/home']);
  }
}
