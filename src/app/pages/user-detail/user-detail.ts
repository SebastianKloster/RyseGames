import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../services/session-service';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail  {

  session = inject(SessionService);
  userService = inject(UserService);
  router = inject(Router);

  user = computed(() => this.session.currentUser());

  constructor() {

    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser && !this.session.currentUser()) {
      this.session.currentUser.set(JSON.parse(storedUser));
    }
  }

  edit() {
    const u = this.user();
    if (u?.id) {
      this.userService.selectUserToEdit(u);
      this.router.navigate(['/user/edit', u.id]);
    }
  }

}
