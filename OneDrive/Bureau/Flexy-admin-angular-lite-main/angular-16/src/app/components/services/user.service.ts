import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../models/AuthenticationRequest';
import { Registrationrequest } from '../models/Registrationrequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  };
  private localhost ='http://localhost:8082/'
  private UserIslogin = this.localhost+'user/connexion';
  private PostUser = this.localhost+'personnel/add';

  constructor(private http: HttpClient) { }
  gettoken() {
    return  localStorage.getItem('Authorization');
  }
  login(username: any,  password: any) {
    const autentification = new AuthenticationRequest(username, password );
console.log(autentification);
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Authorization', ``);
    headers.append('Content-Type', 'application/json');

    const  res = this.http.post<any>(this.UserIslogin , autentification  );
    return res ;
  }
  postUser(registrationrequest: Registrationrequest) {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Authorization', ``);
    headers.append('Content-Type', 'application/json'); 
  
    return  this.http.post<any>(this.PostUser , registrationrequest,  { headers  } );
  }
}
