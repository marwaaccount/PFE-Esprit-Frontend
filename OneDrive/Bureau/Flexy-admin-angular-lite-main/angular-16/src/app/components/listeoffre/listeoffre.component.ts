import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import{OffreService} from 'C:/Users/hamza/OneDrive/Bureau/Flexy-admin-angular-lite-main/angular-16/src/app/offre.service'
import{Offre} from 'src/app/components/offre/offre.model'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-listeoffre',
  templateUrl: './listeoffre.component.html',
  styleUrls: ['./listeoffre.component.scss'],
  
})
export class ListeoffreComponent {
  offres$: Observable<Offre[]> | undefined;
  //offre2$:undefined;

  constructor(private offreservice :OffreService,private router: Router){}

  ngOnInit(): void {
    this.getlisteoffre();
  }
  
  panelOpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  getlisteoffre(): void {
    console.log("data is here ");
    this.offres$ = this.offreservice.getoffres();
    console.log("data is here ",this.offreservice.getoffres());
    
  }
  supprimer(id: number): void {
    this.offreservice.deleteOffre(id)
      .subscribe(
        () => {
          console.log('Fiche supprimée avec succès');
          console.log(id);
          // Mettez à jour l'interface utilisateur après la suppression si nécessaire
          this.ngOnInit();
        },
        error => {
          console.error('Erreur lors de la suppression de la fiche:', error);
          // Gérer l'erreur côté front-end (par exemple, afficher un message d'erreur à l'utilisateur)
        }
      );
  }
  ajouterOffre(){
    console.log("ajouter");
    this.router.navigate(['/offres', 0,'add']);
  }
  modifierOffre(offerId: number){
    console.log("modifier");
    this.router.navigate(['/offres', offerId,'edit']);
    this.getlisteoffre();
  }

  listecandidature(offreId:number,titreOffre:string){
    this.router.navigate(['/candidatures', offreId],{ queryParams: { title: titreOffre } });
   console.log("data is here ",this.offreservice.getoffres());
     }

}
