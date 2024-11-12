// src/app/popupcandidat.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CandidatoffreComponent } from './components/candidatoffre/candidatoffre.component';

@Injectable({
  providedIn: 'root'
})
export class PopupcandidatService {
 readonly API_URL="http://localhost:8082"
  readonly ENDPOINT_FICHE="/candidatoffre"

  constructor(private http: HttpClient) {}

  saveApplication(data: any,id:number): Observable<any> {
    console.log(id);
    console.log(data);
    const headers = new HttpHeaders();
    const token = localStorage.getItem('Authorization');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `${token}`);
    const url = `${this.API_URL}${this.ENDPOINT_FICHE}/add/${id}`;
  console.log('Sending request to URL:', url);
  return this.http.post<any>(url, data,{headers});
  }
}
