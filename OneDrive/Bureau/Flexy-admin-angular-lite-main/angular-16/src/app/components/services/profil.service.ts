import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Personnel } from '../gestionpersonnel/personnel.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  
  constructor(private http: HttpClient) { }

  public optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };
  private localhost ='http://localhost:8082/'
  private UserIslogin = this.localhost+'user/connexion';
  private updateUser = this.localhost+'personnel/getpersonnel';
  private updateUserpers = this.localhost+'personnel/modif';
  private updateUserPWD = this.localhost+'personnel/modifpwd';

  getDataById() {
    const idUser  = localStorage.getItem("idUser");
    const token = localStorage.getItem('Authorization');

    const headers = new HttpHeaders();

    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);

      let params = new HttpParams();
      if (idUser  !== null) {
        params = params.append('id', idUser );
    } else {
        console.error('idUser  is null');
        return of({});
    }      const data = this.http.get<any>(this.updateUser, {headers,params} );
  
      return data;
  }
  updateData( personnel: any): Observable<Personnel> {
    const idUser  = localStorage.getItem('idUser');
    const token = localStorage.getItem('Authorization');
 
    const headers = new HttpHeaders()
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${token}`);
    // Return the result of the HTTP PUT request
    return this.http.put<any>(this.updateUserpers+'/'+Number(idUser), personnel, { headers });
  }
  updatePWD( personnel: any): Observable<any> {
    const token = localStorage.getItem('Authorization');
    const headers = new HttpHeaders()
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${token}`);
    // Return the result of the HTTP PUT request
    return this.http.put<any>(this.updateUserPWD, personnel, { headers });
  }

}
