import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionService } from '../../services/session-service';
import { RoleEnum } from '../../model/roleEnum';
import { NotificacionService } from '../../services/notificacion-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  roleEnum = RoleEnum
  sessionService = inject(SessionService)
  user = this.sessionService.getLoggedUser()
  notifService = inject(NotificacionService)

  dropdownAbierto = signal(false);
  notificaciones = signal<any[]>([]);
  cantidadNoLeidas = computed(() =>
    this.notificaciones().filter(n => !n.leida).length
  );

  constructor(){
    console.log(this.user())

  effect(() => {
    const perfilId = this.user()?.perfil?.id;

    if (perfilId) {
      this.notifService.getByPerfil()
        .subscribe(data => {
          this.notificaciones.set(data);
        });
    }
  });
  }

  toggleDropdown() {
    const nuevoEstado = !this.dropdownAbierto();
    this.dropdownAbierto.set(nuevoEstado);

    if (nuevoEstado && this.cantidadNoLeidas() > 0) {
      const perfilId = this.user()?.perfil?.id;

      if (perfilId) {
        this.notifService.marcarTodas()
          .subscribe(() => {

            this.notificaciones.update(lista =>
              lista.map(n => ({ ...n, leida: true }))
            );
          });
        }
      }
  }


  logout() {
    this.sessionService.logout()
  }

  ngOnInit() {
    const perfilId = this.sessionService.user()?.perfil?.id;

    if (perfilId) {
      this.notifService.getByPerfil()
        .subscribe(data => {
          this.notificaciones.set(data);
        });
    }
  }
}
