import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Personnel } from './components/gestionpersonnel/personnel.model';
@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  readonly API_URL="http://localhost:8082"
  readonly ENDPOINT_FICHE="/personnel"

  constructor(private httpCLient :HttpClient) { }

  getpersonnel(): Observable<Personnel[]>{
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
    return this.httpCLient.get<Personnel[]>(this.API_URL+this.ENDPOINT_FICHE+"/all",  { headers  });
    }
    getpersonnelbyId(): Observable<Personnel[]>{
      const headers = new HttpHeaders();
      const token = localStorage.getItem('Authorization');
      const idUser  = localStorage.getItem("idUser");
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Credentials', 'true');
      headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${token}`);
        let params = new HttpParams();
        if (idUser  !== null) {
          params = params.append('id', idUser );
      } 
      return this.httpCLient.get<Personnel[]>(this.API_URL+this.ENDPOINT_FICHE+"/fichepaiepers",  { headers,params });
      }
    // Récupérer un personnel par CIN
  getByCin(cin: number): Observable<string> {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
    return this.httpCLient.get<string>(`${this.API_URL}${this.ENDPOINT_FICHE}/bycin/${cin}`,  { headers  });
  }

  // Créer un nouveau personnel
  /*createPersonnel(personnel: Personnel): Observable<Personnel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpCLient.post<Personnel>(this.API_URL + this.ENDPOINT_FICHE + "/add", personnel,{ headers });
  }*/

  createPersonnel(personnel: Personnel): Observable<Personnel> {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
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
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
    return this.httpCLient.put<Personnel>(`${this.API_URL}${this.ENDPOINT_FICHE}/modif/${id}`, personnel,{ headers });
  }

  // Supprimer un personnel par ID
  deletePersonnel(id: number): Observable<void> {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
    return this.httpCLient.delete<void>(`${this.API_URL}${this.ENDPOINT_FICHE}/delete/${id}`,  { headers  });
  }

  getRoles(): Observable<any>{
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
     return this.httpCLient.get(this.API_URL+"/role/all",  { headers  });
    }
  
  
}
