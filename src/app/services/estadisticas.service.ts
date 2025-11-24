import { inject, Injectable, signal } from '@angular/core';
import { SessionService } from './session-service';
import { Observable, Subscription, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IestadisticasDesarrolladora } from '../model/estadisticas';

@Injectable({
  providedIn: 'root',
})
export class EstadisticasService {

  private apiURL = 'http://localhost:8080/api/estadisticas';

  sessuionService = inject(SessionService);
  private sessionSub: Subscription | null = null;
  
  private estadisticasState = signal<IestadisticasDesarrolladora | null>(null);
  public estadisticas = this.estadisticasState.asReadonly();

  constructor(private http: HttpClient) { }


  public obtenerEstadisticas(){
    this.http.get<IestadisticasDesarrolladora>(this.apiURL, {

      headers: this.sessuionService.getAuthHeaders()
    }).subscribe(
      (data) => {
        console.log(data);
        this.estadisticasState.set(data);  
      });

  }

  public refreshEstadisticas(): Observable<IestadisticasDesarrolladora> {
    return this.http.get<IestadisticasDesarrolladora>(this.apiURL, {
      headers: this.sessuionService.getAuthHeaders()
    }).pipe(
      tap((data)=> {
        this.estadisticasState.set(data);
      })  
      );
    }



}
