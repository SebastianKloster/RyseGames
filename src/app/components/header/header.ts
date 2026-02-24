import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionService } from '../../services/session-service';
import { RoleEnum } from '../../model/roleEnum';
import { NotificacionService } from '../../services/notificacion-service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificacionDTO } from '../../model/notificacionDTO';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  roleEnum = RoleEnum;

  private sessionService = inject(SessionService);
  private notifService = inject(NotificacionService);
  private destroyRef = inject(DestroyRef);

  user = this.sessionService.getLoggedUser();
  isPerfil = computed(() => this.user()?.role === this.roleEnum.PERFIL);

  dropdownAbierto = signal(false);
  notificaciones = signal<NotificacionDTO[]>([]);

  cantidadNoLeidas = computed(() =>
    this.notificaciones().filter(n => !n.leida).length
  );


  constructor() {
    effect(() => {
      // Fuerza dependencia reactiva del effect
      const u = this.user();

      // Si no es PERFIL (o no hay usuario), limpiá y no llames al backend
      if (!u || u.role !== this.roleEnum.PERFIL || !u.perfil?.id) {
        this.notificaciones.set([]);
        this.dropdownAbierto.set(false);
        return;
      }

      this.notifService.getNotificaciones()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(data => this.notificaciones.set(data));
    });
  }

  toggleDropdown() { //Desplegar Notificaciones
    if (!this.isPerfil()) return;

    this.dropdownAbierto.set(!this.dropdownAbierto());

    if (!this.dropdownAbierto() && this.cantidadNoLeidas() > 0) {
      this.notifService.marcarTodas()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.notificaciones.update(lista =>
            lista.map(n => ({ ...n, leida: true }))
          );
        });
    }
  }

  logout() {
    this.sessionService.logout();
  }
}
