import { Injectable } from '@angular/core';
import { OffreComponent } from './components/offre/offre.component';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { Candidature } from './components/candidature/candidature.model';
//import { Candidature} from 'C:/Users/hamza/OneDrive/Bureau/Flexy-admin-angular-lite-main/angular-16/src/app/components/candidature/candidature.model';
import { Offre } from './components/offre/offre.model';
@Injectable({
  providedIn: 'root'
})
export class OffreService {

  readonly API_URL="http://localhost:8082"
  readonly ENDPOINT_FICHE="/offre"

  constructor(private httpCLient :HttpClient) { 

   
  }
addOffre(offre:Offre): Observable<Offre> {
  const headers = new HttpHeaders();
  const token = localStorage.getItem('Authorization');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${token}`);
   return this.httpCLient.post<Offre>(`${this.API_URL}${this.ENDPOINT_FICHE}/add`,offre, { headers });
 }
 modifOffre(id:number,offre:Offre): Observable<Offre> {
  const headers = new HttpHeaders();
  const token = localStorage.getItem('Authorization');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${token}`);
  return this.httpCLient.put<Offre>(`${this.API_URL}${this.ENDPOINT_FICHE}/modif/${id}`,offre, { headers });
}

 deleteOffre(id:number): Observable<any>{
  const headers = new HttpHeaders();
  const token = localStorage.getItem('Authorization');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${token}`);
  return this.httpCLient.delete(`${this.API_URL}${this.ENDPOINT_FICHE}/delete/${id}`, { headers });
}
  getoffres(): Observable<Offre[]> {
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
    return this.httpCLient.get<Offre[]>(this.API_URL+this.ENDPOINT_FICHE+"/all", { headers });
  }
getOffreById(id:number): Observable<Offre>  {
  const headers = new HttpHeaders();
  const token = localStorage.getItem('Authorization');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${token}`);
  return this.httpCLient.get<Offre>(`${this.API_URL}${this.ENDPOINT_FICHE}/${id}`, { headers });
}

getoffresByCritere(title: string, location: string, contractType: string): Observable<any[]> {
  const headers = new HttpHeaders();
  const token = localStorage.getItem('Authorization');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${token}`);
  let params = new HttpParams();
  if (title) params = params.set('title', title);
  if (location) params = params.set('location', location);
  if (contractType) params = params.set('contractType', contractType);

  return this.httpCLient.get<any[]>(`${this.API_URL}${this.ENDPOINT_FICHE}/search`, {headers,params});
}

getOffre(id:number): Observable<Candidature[]>{
  const headers = new HttpHeaders();
  const token = localStorage.getItem('Authorization');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${token}`);
  console.log('from offre sservice',id, `${this.API_URL}/candidatoffre/all/${id}`);
    
  return this.httpCLient.get<Candidature[]>(`${this.API_URL}/candidatoffre/all/${id}`);
  
}


}
