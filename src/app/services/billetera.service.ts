import { inject, Injectable, signal } from '@angular/core';
import { SessionService } from './session-service';
import { Observable, Subscription, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBilletera } from '../model/billetera';

@Injectable({
  providedIn: 'root',
})
export class BilleteraService {
  private apiURL = 'http://localhost:8080/api/billetera';

  sessionService = inject(SessionService);

  private sessionSub: Subscription | null = null;
  
  private billerteraState = signal<IBilletera | null>(null);

  public billetera = this.billerteraState.asReadonly();

  constructor(private http: HttpClient) {
    this.sessionSub = this.sessionService.isLogged$.subscribe(logged => {
      if (!logged) {
        this.billerteraState.set(null);
      } else {
        this.http.get<IBilletera>(this.apiURL, {
          headers: this.sessionService.getAuthHeaders()
        }).subscribe(
          data => this.billerteraState.set(data)
        ) 
      }});
  } 


  public obtenerBilletera(){
    this.http.get<IBilletera>(this.apiURL, {
      headers: this.sessionService.getAuthHeaders()
    }).subscribe(
      (data) => {
        this.billerteraState.set(data);  
      });
  }

      agregarFondos(monto: number):Observable<IBilletera> {
        const body = { monto }; 

        return this.http.post<IBilletera>(`${this.apiURL}/cargar`, body, {
          headers: this.sessionService.getAuthHeaders()
        }).pipe( 
          tap((billeteraActualizada) => {
            this.billerteraState.set(billeteraActualizada);
          })
        );
      }
      
      
      public refreshBilletera(): Observable<IBilletera> {
        return this.http.get<IBilletera>(this.apiURL, {
          headers: this.sessionService.getAuthHeaders()
        }).pipe(
          tap((data) => {
            this.billerteraState.set(data);
          })
        );
        
      }
}
