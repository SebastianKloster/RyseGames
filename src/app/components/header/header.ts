import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionService } from '../../services/session-service';
import { UserService } from '../../services/user-service';
import { UserVerDTO } from '../../model/user';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header{
session = inject(SessionService);


  user = computed(() => this.session.currentUser());
  isLogged = computed(() => this.user() !== null);

  logout() {
    this.session.logout();
  }
}
