import { LoginComponent } from './components/login/login/login.component';
//import { GestionabsenceComponent } from 'C:/Users/hamza/OneDrive/Bureau/Flexy-admin-angular-lite-main/angular-16/src/app/components/gestionabsence/gestionabsence.component';
//import { GestionabsenceComponent } from './components/gestionabsence/gestionabsence.component';
import { LOCALE_ID, NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullComponent } from './layouts/full/full.component';
import { DemoFlexyModule } from './demo-flexy-module'

import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from './components/components.module';
import { FicheComponent } from './fiche/fiche.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OffreComponent } from './components/offre/offre.component';
import { ListeoffreComponent } from './components/listeoffre/listeoffre.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
//import { PersonnelComponent } from './personnel/personnel.component';
import { ListeoffreCandidatComponent } from './components/listeoffre-candidat/listeoffre-candidat.component';
import { PopupcandidatComponent } from './components/popupcandidat/popupcandidat.component';
import { PopupComponent } from './components/popup/popup.component';
import { CandidatoffreComponent } from './components/candidatoffre/candidatoffre.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidatureComponent } from './components/candidature/candidature.component';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GestionabsenceComponent } from './components/gestionabsence/gestionabsence.component';
import { ValidabsenceComponent } from './validabsence/validabsence.component';
import { GestionpersonnelComponent } from './components/gestionpersonnel/gestionpersonnel.component';
//import { PersonnelComponent } from './personnel/personnel.component';
//import { CandidaturesComponent } from './candidatures/candidatures.component'; 
import { RejectionModalComponent } from './validabsence/RejectionModalComponent';
import { ProfilComponent } from './components/login/profil/profil.component';
import { InerceptknInterceptor } from './components/services/inerceptkn.interceptor';
//import { JobService } from './services/job.service'; 
registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    FicheComponent,
    ListeoffreComponent,
    //PersonnelComponent,
    ListeoffreCandidatComponent,
    PopupcandidatComponent,
    CandidatoffreComponent,
    CandidatureComponent,
    PopupcandidatComponent,
    PopupComponent,
    GestionabsenceComponent,
    ValidabsenceComponent,
    GestionpersonnelComponent,
    RejectionModalComponent,
    ProfilComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    ReactiveFormsModule ,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  //entryComponents: [RejectionModalComponent]
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: InerceptknInterceptor,
    multi: true
  },{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
