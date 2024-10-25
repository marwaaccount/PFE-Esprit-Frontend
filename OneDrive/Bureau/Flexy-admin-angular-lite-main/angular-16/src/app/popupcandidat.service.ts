// src/app/popupcandidat.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CandidatoffreComponent } from './components/candidatoffre/candidatoffre.component';

@Injectable({
  providedIn: 'root'
})
export class PopupcandidatService {
 readonly API_URL="http://localhost:8080"
  readonly ENDPOINT_FICHE="/candidatoffre"

  constructor(private http: HttpClient) {}

  saveApplication(data: any,id:number): Observable<any> {
    console.log(id);
    console.log(data);
    const url = `${this.API_URL}${this.ENDPOINT_FICHE}/add/${id}`;
  console.log('Sending request to URL:', url);
  return this.http.post<any>(url, data);
  }
}
