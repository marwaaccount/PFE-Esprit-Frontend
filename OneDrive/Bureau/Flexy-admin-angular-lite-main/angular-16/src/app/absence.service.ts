import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { demandeAbscence } from 'C:/Users/hamza/OneDrive/Bureau/Flexy-admin-angular-lite-main/angular-16/src/app/components/gestionabsence/demandeAbscence.model';
import { demandeAbsenceAtt } from 'C:/Users/hamza/OneDrive/Bureau/Flexy-admin-angular-lite-main/angular-16/src/app/validabsence/demandeAbsenceAtt.model';


@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  readonly API_URL="http://localhost:8080"
  readonly ENDPOINT_FICHE="absence"

  constructor(private httpCLient :HttpClient) { }
  getSoldeConge(id:number){
    return this.httpCLient.get(`${this.API_URL}/${this.ENDPOINT_FICHE}/${id}`);
  }
 

 addRequest(id: number, request: any): Observable<any> {
  return this.httpCLient.post(`${this.API_URL}/${this.ENDPOINT_FICHE}/add/${id}`, request, {
      headers: { 'Content-Type': 'application/json' }
  });
}


   // Fetch all leave requests for a user
   getAllRequests():Observable<demandeAbscence[]> {
    return this.httpCLient.get<demandeAbscence[]>(`${this.API_URL}/${this.ENDPOINT_FICHE}/all`);
  }

  // Update a leave request
  updateRequest(requestId: number, request: demandeAbscence): Observable<demandeAbscence> {
    return this.httpCLient.put<demandeAbscence>(`${this.API_URL}/${this.ENDPOINT_FICHE}/modif/${requestId}`, request);
  }

  // Delete a leave request
  deleteRequest(requestId: number) {
    return this.httpCLient.delete(`${this.API_URL}/${this.ENDPOINT_FICHE}/delete/${requestId}`);
  }

  getAttenteRequests():Observable<demandeAbsenceAtt[]> {
    return this.httpCLient.get<demandeAbsenceAtt[]>(`${this.API_URL}/${this.ENDPOINT_FICHE}/allattente`);
  }


  approveAbsence(id: number, nb: number): Observable<any> {
    return this.httpCLient.put(`${this.API_URL}/absence/${id}/approuver`, { id, nb });
  }

  rejectAbsence(id: number, motif: string): Observable<any> {
    return this.httpCLient.put(`${this.API_URL}/absence/${id}/rejeter`, { id, motif });
  }
  getByid(id:number){
   return this.httpCLient.get(`${this.API_URL}/absence/getpersonnelById/${id}`);
  }

  
}