import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuegoService } from '../../services/juego-service';
import { JuegoModel } from '../../model/juego';

@Component({
  selector: 'app-juego-detail.component',
  imports: [],
  templateUrl: './juego-detail.component.html',
  styleUrl: './juego-detail.component.css',
})
export class JuegoDetailComponent implements OnInit{

  juego: JuegoModel | null = null;
  private route = inject(ActivatedRoute);
  private juegoService = inject(JuegoService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const id = params.get('id');

      if(id){
        this.juegoService.getJuegoById(+id).subscribe({
          next: (data)=>{
            this.juego = data;
            this.cdr.detectChanges();
          },
          error: (err)=>{
            console.error('Error al obtener el juego', err);
            this.juego = null;
          }
        });
      } else{
        this.juego = null;
      }
    });
  }
}
