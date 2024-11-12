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

  private apiUrl = 'http://localhost:8082'; // Adjust to your backend URL
  readonly ENDPOINT_FICHE="/candidatoffre"

  constructor(private http: HttpClient) { }

  // Method to approve a candidature
  approuver(OfferId: number, candidatId: number,entretien: Entretien): Observable<Entretien> {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
    const url = `${this.apiUrl}${this.ENDPOINT_FICHE}/approuver/${OfferId}/${candidatId}`;
    return this.http.post<Entretien>(url, entretien,  { headers })
    .pipe(
      map(response => response),
      catchError(this.handleError<Entretien>('approuver'))
    );
  }

  // Method to reject a candidature
  rejeter(id: number,candidatId: number): Observable<CandidatOffre> {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
    const url = `${this.apiUrl}${this.ENDPOINT_FICHE}/rejeter/${id}/${candidatId}`;
    return this.http.post<CandidatOffre>(url, {},{ headers }).pipe(
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
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
    const url = `${this.apiUrl}${this.ENDPOINT_FICHE}/sendEmail`;
    const body = {
      action: action,
      candidatId: candidatId,
      interviewDate: interviewDate,
      interviewLocation: interviewLocation
    };
    return this.http.post<void>(url, body,  { headers }); // Envoie une requête POST sans corps
  }
}
