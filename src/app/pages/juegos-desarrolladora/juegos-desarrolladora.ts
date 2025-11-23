import { Component, inject, OnInit } from '@angular/core';
import { JuegoModel, JuegoVerDTO } from '../../model/juego';
import { DesarrolladoraService } from '../../services/desarrolladora-service';
import { RouterLink } from "@angular/router";
import { CurrencyPipe } from '@angular/common';
import { CategoriaEnum } from '../../model/categoriaEnum';

@Component({
  selector: 'app-juegos-desarrolladora',
  imports: [],
  templateUrl: './juegos-desarrolladora.html',
  styleUrl: './juegos-desarrolladora.css',
})
export class JuegosDesarrolladora implements OnInit{
;

  desarrolladoraService = inject(DesarrolladoraService);


  ngOnInit(){
    this.desarrolladoraService.loadJuegos();
  }

  /**deleteEvent(id: string){
    if(confirm('¿Estas seguro de que quieres eliminar a este usuario?')){
      this.eventService.delete(id).subscribe(()=>{
        console.log(`Usuario con id ${id} eliminado.`)
      });
    }
  }

  editEvent(event: IEvent){
    this.eventService.selectEventToEdit(event);
    this.router.navigate(['/edit']);

  } */

    deleteJuego(id: number){
      if(confirm('¿Estas seguro de que quieres eliminar este juego?')){
      }
    }
}
