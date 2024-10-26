import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'http://localhost:3000/api/cards'; // Your backend URL

  constructor(private http: HttpClient) {}

  // Fetch all cards from the backend
  getCards(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Fetch ownership information for a specific card
  getCardOwnership(cardId: string, userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${cardId}/ownership?userId=${userId}`);
  }

  getCardDetail(cardId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${cardId}`);
  }

  // Update ownership information for a specific card
  updateCardOwnership(cardId: string, userId: number, owns: boolean, copies: number): Observable<any> {
    console.log(cardId)
    return this.http.post(`${this.apiUrl}/${cardId}/ownership`, { userId, owns, copies });
  }
}
