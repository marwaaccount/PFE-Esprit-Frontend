import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OffreService } from 'src/app/offre.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Offre } from './offre.model';


@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatCheckboxModule, MatRadioModule, MatButtonModule, MatSelectModule, CommonModule],
})
export class OffreComponent implements OnInit {
  offreForm!: FormGroup;
  types: string[] = ['civp', 'CDD', 'CDI', 'freelance', 'stage']; // Exemple d'options
  offre: Observable<Offre> | undefined;
  mode: any;
  textMode:  any;
  offerId: any;
  offres$: Observable<Offre[]> | undefined;
  dateFinValidator(control: any) {
    if (!this.offreForm) {
      return null;
    }
    const datePub = this.offreForm.get('datePub')?.value;
    if (!datePub || !control.value) {
      return null;
    }
    const dateFin = new Date(control.value);
    return dateFin > new Date(datePub) ? null : { invalidDate: true };
  }


  constructor(private _router: Router, private offreservice: OffreService, private fb: FormBuilder,private route: ActivatedRoute) {
   
    this.offreForm = this.fb.group({
      titre: ['', Validators.required],
      details: ['', Validators.required],
      localisation: ['', Validators.required],
      typeContrat: ['', Validators.required],
      exigences: ['', Validators.required],
      datePub: [new Date()],
      datefin: [null, [Validators.required, this.dateFinValidator.bind(this)]]
    });
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Récupérer le paramètre 'id' de l'URL
      this.mode = params.get('mode');
      console.log('mode init ',this.mode );
      this.offerId = params.get('offerId');
      if (this.mode  === 'edit') {
        this.textMode="Modifier l\'offre";
        if ( this.offerId) {
         this.getOffer(parseInt( this.offerId, 10));
  
        }
      }else{
        this.textMode="Ajouter l\'offre";
        console.log('add mode', this.offerId);

    }
    });
  }

  onBack(): void {
    this._router.navigate(['/flexy/home']);
  }

  padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }
 convertDateFormat(dateString: string): string {
    // Split the dateString into year, month, and day
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
  
    // Create a new Date object using the extracted parts
    const date = new Date(`${year}-${month}-${day}`);
  
    // Format the date to the desired format
    const formattedDate = `${date.getFullYear()}-${this.padNumber(date.getMonth() + 1)}-${this.padNumber(date.getDate())}T${this.padNumber(date.getHours())}:${this.padNumber(date.getMinutes())}:${this.padNumber(date.getSeconds())}`;
  
    return formattedDate;
  }
 getOffer(offerId :number):void{
  console.log("getOffer ");
  this.offreservice.getOffreById(offerId).subscribe(
    (data: any) => {
      this.offre  = data;
      const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      };

      this.offreForm.patchValue({
        titre: data.titre,
        details: data.details,
        localisation: data.localisation,
        typeContrat: data.typeContrat,
        exigences: data.exigences,
        datefin: data.datefin ? formatDate(data.datefin) : null 
      });
    },
    error => {
      console.error('Erreur lors de la récupération des données : ', error);
      // Gérer les erreurs si nécessaire
    }
  );
 }
 manageOffre(): void {
  if (this.mode  === 'edit') {
    this.modifOffre();
  }else{
    this.ajoutOffre();
  }
  this.offres$ = this.offreservice.getoffres();
  this._router.navigate(['redirTohome']);
  }

  modifOffre(): void {
    console.log(this.offreForm.value);
    if (this.offreForm.invalid) {
      console.log('Le formulaire est invalide');
      return;
    }
    this.offreForm.value.datefin=this.convertDateFormat(this.offreForm.value.datefin);
    this.offreservice.modifOffre(this.offerId,this.offreForm.value).subscribe({
      next: (result) => 
      {
        
        console.log('Offre ajoutée avec succès', result);
        this.offreForm.reset({
          datePub: new Date()
        }); // Réinitialiser le formulaire
      },
      error: (err) => console.error('Erreur lors de l\'ajout de l\'offre', err)
    });
  }
  ajoutOffre(): void {
    console.log(this.offreForm.value);
    if (this.offreForm.invalid) {
      console.log('Le formulaire est invalide');
      return;
    }
    this.offreForm.value.datefin=this.convertDateFormat(this.offreForm.value.datefin);
    this.offreservice.addOffre(this.offreForm.value).subscribe({
      next: (result) => 
      {
        
        console.log('Offre ajoutée avec succès', result);
        this.offreForm.reset({
          datePub: new Date()
        }); // Réinitialiser le formulaire
      },
      error: (err) => console.error('Erreur lors de l\'ajout de l\'offre', err)
    });
  }
}




