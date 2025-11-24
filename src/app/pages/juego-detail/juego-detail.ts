import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuegoService } from '../../services/juego-service';
import { JuegoModel, JuegoVerDesarrolladoraDTO, JuegoVerDTO } from '../../model/juego';

@Component({
  selector: 'app-juego-detail',
  imports: [CommonModule],
  templateUrl: './juego-detail.html',
  styleUrl: './juego-detail.css',
})
export class JuegoDetail implements OnInit{
  private route = inject(ActivatedRoute)
  juegoService = inject(JuegoService);
   private cdr = inject(ChangeDetectorRef);

  juego: JuegoVerDesarrolladoraDTO | null = null;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.juegoService.getJuego(id).subscribe({
      next: (data) =>{
        console.log(this.juego)
        this.juego = data
        this.cdr.detectChanges()
      },
      error: () => {
        alert("No se pudo cargar el juego")
        this.juego = null;
      }
    });
  }
}
