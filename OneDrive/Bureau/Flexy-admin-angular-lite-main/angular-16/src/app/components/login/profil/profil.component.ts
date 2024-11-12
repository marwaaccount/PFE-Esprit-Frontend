import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Personnel } from '../../gestionpersonnel/personnel.model';
import { ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  registerForm: FormGroup;
  personnels: Personnel[] = [];
  selectedPersonnel: Personnel | null = null;
  nom!: String;
  constructor(private profilService: ProfilService, private router: Router, private route: ActivatedRoute,private snackBar: MatSnackBar) {
    this.nom = localStorage.getItem("role")|| '';
    // Initialize the form group in the constructor
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      nom: new FormControl(''),
      prenom: new FormControl(''),
      cin: new FormControl(''),
      numTelephone: new FormControl(''),
      enfantsacharge: new FormControl(''),
      adresse: new FormControl(''),
      grade: new FormControl(''),
      idcnss: new FormControl(''),
      poste: new FormControl('')
    });
  }
  resetSelectedPersonnel() {
    this.selectedPersonnel = {
      nom: '',
      prenom: '',
      adresse: '',
      email: '',
      numTelephone: '',
      poste: '',
      grade: '',
      idcnss: 0,
      cin: 0,
      enfantsacharge: 0,
    };this.registerForm.reset();
    //this.isFormVisible = true;
  }
  ngOnInit(): void {
    this.resetSelectedPersonnel();
    const idUser  = localStorage.getItem("idUser");
    const idClient = localStorage.getItem("idclient");

    // Fetch data using the service
    this.profilService.getDataById().subscribe((data: any) => {
      console.log(data);
      this.personnels = data;
      this.registerForm.patchValue({
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        cin: data.cin,
        numTelephone: data.numTelephone,
        enfantsacharge: data.enfantsacharge,
        adresse: data.adresse,
        grade: data.grade,
        idcnss: data.idcnss,
        poste: data.poste
       });
    });
  }

  async register(): Promise<void> {
    const idUser  = localStorage.getItem("idUser");

    console.log(this.personnels);
    if (this.registerForm.valid) {
      // Handle form submission
      const personnelData: Personnel = {
        ...this.selectedPersonnel,
        ...this.registerForm.value
      };

        // Update existing personnel
        const personnel: Personnel = {
          nom: this.registerForm.value.nom,
          prenom: this.registerForm.value.prenom,
          adresse: this.registerForm.value.adresse,
          email: this.registerForm.value.email,
          motdepasse: this.registerForm.value.motdepasse,
          numTelephone: this.registerForm.value.numTelephone,
          poste: this.registerForm.value.poste,
          grade: this.registerForm.value.grade,
          idcnss: this.registerForm.value.idcnss,
          cin: this.registerForm.value.cin,
          enfantsacharge: this.registerForm.value.enfantsacharge,
          categorie: this.registerForm.value.categorie,
        };      
           this.profilService.updateData(personnel).subscribe(
            (data: any) => {
          console.log('Form submitted successfully');
          this.registerForm.patchValue({
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            cin: data.cin,
            numTelephone: data.numTelephone,
            enfantsacharge: data.enfantsacharge,
            adresse: data.adresse,
            grade: data.grade,
            idcnss: data.idcnss,
            poste: data.poste
          });
          this.snackBar.open(`Modification  avec succès!`, 'Fermer', {
            duration: 3000, // Durée en millisecondes
          });        },
        (error: any) => {
          console.error('Error submitting form', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}