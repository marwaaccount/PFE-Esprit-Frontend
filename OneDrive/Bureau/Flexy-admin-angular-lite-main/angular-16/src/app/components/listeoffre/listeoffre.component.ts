import { Component } from '@angular/core';
import { Router } from '@angular/router';
import{OffreService} from 'src/app/offre.service'
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
