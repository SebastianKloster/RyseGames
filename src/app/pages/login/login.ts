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

  fb = inject(FormBuilder)
  userForm = this.fb.nonNullable.group({
    user: ['', [Validators.required]],
    pass: ['', [Validators.required]],
  })



  handleSubmit() {
    if (this.userForm.valid) {
      this.login(this.userForm.getRawValue().user, this.userForm.getRawValue().pass)
      this.router.navigate(['/store']);
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


}
