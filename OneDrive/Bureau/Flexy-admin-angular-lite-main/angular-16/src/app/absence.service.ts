import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { demandeAbscence } from './components/gestionabsence/demandeAbscence.model';
import { demandeAbsenceAtt } from './validabsence/demandeAbsenceAtt.model';


@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  readonly API_URL="http://localhost:8082"
  readonly ENDPOINT_FICHE="absence"

  constructor(private httpCLient :HttpClient) { }
  getSoldeConge(id:number){
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
    return this.httpCLient.get(`${this.API_URL}/${this.ENDPOINT_FICHE}/${id}`, { headers });
  }
 

 addRequest(id: number, request: any): Observable<any> {
  const headers = new HttpHeaders();
  const token = localStorage.getItem('Authorization');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${token}`);
  return this.httpCLient.post(`${this.API_URL}/${this.ENDPOINT_FICHE}/add/${id}`, request, { headers });
}


   // Fetch all leave requests for a user
   getAllRequests():Observable<demandeAbscence[]> {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
    return this.httpCLient.get<demandeAbscence[]>(`${this.API_URL}/${this.ENDPOINT_FICHE}/all`, { headers });
  }

  // Update a leave request
  updateRequest(requestId: number, request: demandeAbscence): Observable<demandeAbscence> {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
    return this.httpCLient.put<demandeAbscence>(`${this.API_URL}/${this.ENDPOINT_FICHE}/modif/${requestId}`, request, { headers });
  }

  // Delete a leave request
  deleteRequest(requestId: number) {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
    return this.httpCLient.delete(`${this.API_URL}/${this.ENDPOINT_FICHE}/delete/${requestId}`, { headers });
  }

  getAttenteRequests():Observable<demandeAbsenceAtt[]> {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
    return this.httpCLient.get<demandeAbsenceAtt[]>(`${this.API_URL}/${this.ENDPOINT_FICHE}/allattente`, { headers });
  }


  approveAbsence(id: number, nb: number): Observable<any> {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
    return this.httpCLient.put(`${this.API_URL}/absence/${id}/approuver`, { id, nb }, { headers });
  }

  rejectAbsence(id: number, motif: string): Observable<any> {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
    return this.httpCLient.put(`${this.API_URL}/absence/${id}/rejeter`, { id, motif }, { headers });
  }
  getByid(id:number){
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
   return this.httpCLient.get(`${this.API_URL}/absence/getpersonnelById/${id}`, { headers });
  }

  
}