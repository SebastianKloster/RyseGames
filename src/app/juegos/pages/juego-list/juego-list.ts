import { Component, inject } from '@angular/core';
import { JuegoService } from '../../services/juego-service';
import { Router, RouterLink } from '@angular/router';
import { JuegoUpdateDTO } from '../../model/juego';

@Component({
  selector: 'app-juego-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './juego-list.html',
  styleUrl: './juego-list.css',
})
export class JuegoList {
  juegoService = inject(JuegoService);

  juegos = this.juegoService.juegos;

  private router = inject(Router);

  deleteJuego(id: number){
    if (confirm('¿Estas seguro de que quieres eliminar este juego?')){
      this.juegoService.delete(id).subscribe(()=>{
        alert('Juego eliminado con exito');
      });
    }
  }

  editJuego(juego: JuegoUpdateDTO){
    this.juegoService.selectJuegoToEdit(juego);
    this.router.navigate(['/juegos/edit']);
  }
}
