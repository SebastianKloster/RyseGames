import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JuegoModel } from '../model/juego';

@Injectable({
  providedIn: 'root',
})
export class FavServices {
  apiURL = "http://localhost:8080/api/perfil/juegos/favoritos"

  http = inject(HttpClient)


  getFavoritos(){
    return this.http.get<JuegoModel[]>(this.apiURL)
  }
  consultarFav(id:number) {
    return this.http.get<boolean>(this.apiURL+"/"+id)
  }
  addFav(id:number){
    return this.http.post(this.apiURL+"/"+id, null)
  }
  removeFav(id:number){
    return this.http.delete(this.apiURL+"/"+id)
  }
}
