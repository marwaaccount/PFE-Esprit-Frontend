import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
// Define interfaces for your models if not already defined
export interface Entretien {
  date: string;
  lieu: string;
  etat: string;
  // Add other fields if necessary
}

export interface CandidatOffre {
  // Define fields based on the CandidatOffre model
}

@Injectable({
  providedIn: 'root'
})
export class CandidatOffreService {

  private apiUrl = 'http://localhost:8080'; // Adjust to your backend URL
  readonly ENDPOINT_FICHE="/candidatoffre"

  constructor(private http: HttpClient) { }

  // Method to approve a candidature
  approuver(OfferId: number, candidatId: number,entretien: Entretien): Observable<Entretien> {
    const url = `${this.apiUrl}${this.ENDPOINT_FICHE}/approuver/${OfferId}/${candidatId}`;
    return this.http.post<Entretien>(url, entretien, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map(response => response),
      catchError(this.handleError<Entretien>('approuver'))
    );
  }

  // Method to reject a candidature
  rejeter(id: number,candidatId: number): Observable<CandidatOffre> {
    const url = `${this.apiUrl}${this.ENDPOINT_FICHE}/rejeter/${id}/${candidatId}`;
    return this.http.post<CandidatOffre>(url, {}, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map(response => response),
      catchError(this.handleError<CandidatOffre>('rejeter'))
    );
  }

  // Error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  sendEmail(action: string, candidatId: number, interviewDate: string, interviewLocation: string): Observable<void> {
    const url = `${this.apiUrl}${this.ENDPOINT_FICHE}/sendEmail`;
    const body = {
      action: action,
      candidatId: candidatId,
      interviewDate: interviewDate,
      interviewLocation: interviewLocation
    };
    return this.http.post<void>(url, body); // Envoie une requête POST sans corps
  }
}
