import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Personnel } from 'C:/Users/hamza/OneDrive/Bureau/Flexy-admin-angular-lite-main/angular-16/src/app/components/gestionpersonnel/personnel.model'
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  readonly API_URL="http://localhost:8080"
  readonly ENDPOINT_FICHE="/personnel"

  constructor(private httpCLient :HttpClient) { }

  getpersonnel(): Observable<Personnel[]>{
    
    return this.httpCLient.get<Personnel[]>(this.API_URL+this.ENDPOINT_FICHE+"/all");
    }
  
    // Récupérer un personnel par CIN
  getByCin(cin: number): Observable<string> {
    return this.httpCLient.get<string>(`${this.API_URL}${this.ENDPOINT_FICHE}/bycin/${cin}`);
  }

  // Créer un nouveau personnel
  /*createPersonnel(personnel: Personnel): Observable<Personnel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpCLient.post<Personnel>(this.API_URL + this.ENDPOINT_FICHE + "/add", personnel,{ headers });
  }*/

  createPersonnel(personnel: Personnel): Observable<Personnel> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });
    return this.httpCLient.post<Personnel>(this.API_URL + this.ENDPOINT_FICHE + "/add", personnel, { headers })
        .pipe(
            catchError(err => {
                console.error('Error occurred:', err);
                return throwError(err); // rethrow the error after logging it
            })
        );
}

  // Mettre à jour un personnel existant
  updatePersonnel(id: number, personnel: Personnel): Observable<Personnel> {
    return this.httpCLient.put<Personnel>(`${this.API_URL}${this.ENDPOINT_FICHE}/modif/${id}`, personnel);
  }

  // Supprimer un personnel par ID
  deletePersonnel(id: number): Observable<void> {
    return this.httpCLient.delete<void>(`${this.API_URL}${this.ENDPOINT_FICHE}/delete/${id}`);
  }

  getRoles(): Observable<any>{
    
     return this.httpCLient.get(this.API_URL+"/role/all");
    }
  
  
}
