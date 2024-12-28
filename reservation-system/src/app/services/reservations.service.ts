import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private apiUrl = 'https://localhost:44329/api/ReservationManagement';

  constructor(private http: HttpClient) {}

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  createReservation(reservation: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reservation);
  }

  deleteReservation(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
  
  getFilteredReservations(filters: { [key: string]: any }): Observable<any[]> {
    let params = new HttpParams();

    for (const key in filters) {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    }
  
    return this.http.get<any[]>(this.apiUrl, { params });
  }

getAvailableSpaces(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/available-spaces`);
}

getAvailableUsers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/available-users`);
}
} 
