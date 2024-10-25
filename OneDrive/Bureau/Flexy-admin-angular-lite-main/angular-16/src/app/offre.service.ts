import { Injectable } from '@angular/core';
import { OffreComponent } from './components/offre/offre.component';
import { Observable } from 'rxjs';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Candidature } from 'C:/Users/hamza/OneDrive/Bureau/Flexy-admin-angular-lite-main/angular-16/src/app/components/candidature/candidature.model';
//import { Candidature} from 'C:/Users/hamza/OneDrive/Bureau/Flexy-admin-angular-lite-main/angular-16/src/app/components/candidature/candidature.model';
import { Offre } from 'C:/Users/hamza/OneDrive/Bureau/Flexy-admin-angular-lite-main/angular-16/src/app/components/offre/offre.model';
@Injectable({
  providedIn: 'root'
})
export class OffreService {

  readonly API_URL="http://localhost:8080"
  readonly ENDPOINT_FICHE="/offre"

  constructor(private httpCLient :HttpClient) { 

   
  }
addOffre(offre:Offre): Observable<Offre> {
    
   return this.httpCLient.post<Offre>(`${this.API_URL}${this.ENDPOINT_FICHE}/add`,offre);
 }
 modifOffre(id:number,offre:Offre): Observable<Offre> {
    
  return this.httpCLient.put<Offre>(`${this.API_URL}${this.ENDPOINT_FICHE}/modif/${id}`,offre);
}

 deleteOffre(id:number): Observable<any>{
  return this.httpCLient.delete(`${this.API_URL}${this.ENDPOINT_FICHE}/delete/${id}`);
}
  getoffres(): Observable<Offre[]> {
    return this.httpCLient.get<Offre[]>(this.API_URL+this.ENDPOINT_FICHE+"/all");
  }
getOffreById(id:number): Observable<Offre>  {
  return this.httpCLient.get<Offre>(`${this.API_URL}${this.ENDPOINT_FICHE}/${id}`);
}

getoffresByCritere(title: string, location: string, contractType: string): Observable<any[]> {
  let params = new HttpParams();
  if (title) params = params.set('title', title);
  if (location) params = params.set('location', location);
  if (contractType) params = params.set('contractType', contractType);

  return this.httpCLient.get<any[]>(`${this.API_URL}${this.ENDPOINT_FICHE}/search`, { params });
}

getOffre(id:number): Observable<Candidature[]>{
  console.log('from offre sservice',id, `${this.API_URL}/candidatoffre/all/${id}`);
    
  return this.httpCLient.get<Candidature[]>(`${this.API_URL}/candidatoffre/all/${id}`);
  
}


}
