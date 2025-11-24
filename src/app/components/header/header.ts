import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionService } from '../../services/session-service';
import { RoleEnum } from '../../model/roleEnum';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  roleEnum = RoleEnum
  sessionService = inject(SessionService)

  user = this.sessionService.getLoggedUser()
}
