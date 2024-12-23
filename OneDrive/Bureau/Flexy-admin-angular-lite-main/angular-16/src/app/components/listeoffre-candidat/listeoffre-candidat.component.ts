import { Component } from '@angular/core';
import { OffreService } from 'src/app/offre.service'; // Adjust the path based on your actual structure
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupcandidatComponent } from '../popupcandidat/popupcandidat.component';
import { Offre } from '../offre/offre.model';

@Component({
  selector: 'app-listeoffre-candidat',
  templateUrl: './listeoffre-candidat.component.html',
  styleUrls: ['./listeoffre-candidat.component.scss']
})
export class ListeoffreCandidatComponent {

  searchCriteria = { title: '', location: '', contractType: '' };
  contractTypes: string[] = ['CDI', 'CDD', 'Freelance', 'Stage'];
  offres$ = this.offreservice.getoffres(); // Vous récupérez initialement toutes les offres
  filteredOffres$ = [];

  



  offres2$: Observable<Offre[]> | undefined;


  constructor(private offreservice :OffreService,private router: Router,public dialog: MatDialog){}

  ngOnInit(): void {
    this.getlisteoffre();
  }
  
  panelOpenState = false;
  step = 0;

  searchJobs(): void {
    console.log("hello from  the other side ");

     this.offres$=this.offreservice.getoffresByCritere(
      this.searchCriteria.title, 
      this.searchCriteria.location, 
      this.searchCriteria.contractType )
  }

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
    this.offres2$ = this.offreservice.getoffres();
    console.log("data is here ",this.offreservice.getoffres());
    
  }

  openPopup(titre:String, id:number): void {
    const dialogRef = this.dialog.open(PopupcandidatComponent, {
      data: { titre: titre , id:id} // Passer l'ID d'utilisateur en tant que données au composant de popup
      
    });
    this.router.navigate(['/popup', id]);
    this.router.navigate(['redirTohome']);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Logique après la fermeture du dialogue si nécessaire
      this.ngOnInit();
    });
}

}
