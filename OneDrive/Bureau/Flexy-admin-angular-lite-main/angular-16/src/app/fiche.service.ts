import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheComponent } from './fiche/fiche.component';
import { Fiche } from './fiche/fiche.model';


@Injectable({
  providedIn: 'root'
})
export class FicheService {

  readonly API_URL="http://localhost:8080"
  readonly ENDPOINT_FICHE="/fiche"

  constructor(private httpCLient :HttpClient) { }

  getfiches(){
    console.log("data is here //////////////");
    return this.httpCLient.get(this.API_URL+this.ENDPOINT_FICHE+"/all");
    }

  calculsalaire(id:number){
    return this.httpCLient.get(`${this.API_URL}/${this.ENDPOINT_FICHE}/calculsalaire/${id}`);
  }

  listeficheparPersonnel(cin:number){
    return this.httpCLient.get(`${this.API_URL}${this.ENDPOINT_FICHE}/allparpersonne/${cin}`)
  }

  addFiche(id:number,fiche: Fiche): Observable<Fiche> {

     console.log('here   ');
    return this.httpCLient.post<Fiche>(`${this.API_URL}${this.ENDPOINT_FICHE}/add/${id}`,fiche);
  }

   

  modiffiche(id:number, fiche:Fiche): Observable<Fiche>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpCLient.put<Fiche>(`${this.API_URL}${this.ENDPOINT_FICHE}/modif/${id}`,fiche);
  }

  deletefiche(id:number){
    return this.httpCLient.delete(`${this.API_URL}${this.ENDPOINT_FICHE}/delete/${id}`);
  }
 
  findName(cin: number): Observable<string> {
    return this.httpCLient.get<string>(`http://localhost:8080/personnel/bycin/${cin}`, { responseType: 'text' as 'json' });
}
   
  
  
   
  
}
