import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from '../../services/session-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router)
  sessionService = inject(SessionService)
  isLogged = this.sessionService.isLogged();

  fb = inject(FormBuilder)
  userForm = this.fb.nonNullable.group({
    user: ['', [Validators.required]],
    pass: ['', [Validators.required]],
  })

  constructor(){
    console.log("Está logeado??")
    console.log(this.isLogged())
  }


  handleSubmit() {
    if (this.userForm.valid) {
      this.login(this.userForm.getRawValue().user, this.userForm.getRawValue().pass)
    } else {
      alert("Fomurlario inválido");
    }
  }

  login(user:string, pass:string) {
    this.sessionService.login(user, pass);
  }
  logout() {
    this.sessionService.logout();
  }
  goToRegister(){
    this.router.navigate(['/register']);
  }


}
