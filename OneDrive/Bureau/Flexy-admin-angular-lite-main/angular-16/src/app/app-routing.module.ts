import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { ListeficheComponent } from './components/listefiche/listefiche.component';
import { OffreComponent } from './components/offre/offre.component';
import { ListeoffreComponent } from './components/listeoffre/listeoffre.component';
//import { PersonnelComponent } from './personnel/personnel.component';
import { ListeoffreCandidatComponent } from './components/listeoffre-candidat/listeoffre-candidat.component';
import { PopupcandidatComponent } from './components/popupcandidat/popupcandidat.component';
import { CandidatureComponent } from './components/candidature/candidature.component';
import { GestionabsenceComponent } from 'C:/Users/hamza/OneDrive/Bureau/Flexy-admin-angular-lite-main/angular-16/src/app/components/gestionabsence/gestionabsence.component';
import { ValidabsenceComponent } from './validabsence/validabsence.component';
import { GestionpersonnelComponent } from 'C:/Users/hamza/OneDrive/Bureau/Flexy-admin-angular-lite-main/angular-16/src/app/components/gestionpersonnel/gestionpersonnel.component';


const routes: Routes = [
  {
    path:"",
    component:FullComponent,
    children: [
      {path:"", redirectTo:"", pathMatch:"full"},
      {path:"home", component:ListeoffreCandidatComponent},
      {path:"alerts", component:AlertsComponent},
      {path:"offres/:offerId/:mode", component:OffreComponent},
      {path:"table", component:ProductComponent},
      {path:"liste-fiches/:cin/:id", component:ListeficheComponent},
      //{path:"personnels", component:PersonnelComponent},
      {path:"grid-list", component:GridListComponent},
      {path:"menu", component:MenuComponent},
      {path:"tabs", component:TabsComponent},
      {path:"expansion", component:ListeoffreComponent},
      {path:"chips", component:ChipsComponent},
      {path:"progress", component:ProgressComponent},
      {path:"toolbar", component:ToolbarComponent},
      {path:"progress-snipper", component:ProgressSnipperComponent},
      {path:"snackbar", component: GestionabsenceComponent},
      {path:"slider", component:ValidabsenceComponent},
      {path:"slide-toggle", component:SlideToggleComponent},
      {path:"tooltip", component:GestionpersonnelComponent},
      {path:"button", component:ButtonsComponent},
      {path: 'candidatures/:id', component: CandidatureComponent },
    ]
  },

  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"**", redirectTo:"/home", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
