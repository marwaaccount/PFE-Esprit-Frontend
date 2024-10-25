import { Component } from '@angular/core';
import { PersonnelService } from 'C:/Users/hamza/OneDrive/Bureau/Flexy-admin-angular-lite-main/angular-16/src/app/personnel.service';
import { Personnel } from './personnel.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from './role.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-gestionpersonnel',
  templateUrl: './gestionpersonnel.component.html',
  styleUrls: ['./gestionpersonnel.component.scss']
})
export class GestionpersonnelComponent {

  personnels: Personnel[] = [];
  selectedPersonnel: Personnel | null = null;
  personnelForm: FormGroup;
  roles: Role[] = [];
  isFormVisible: boolean = false;
// Méthode pour réinitialiser selectedPersonnel
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
    categorie: '',
    role: { id: null, description: '' } 
    
  };this.personnelForm.reset();
  //this.isFormVisible = true;
}

constructor(private personnelService: PersonnelService,private fb: FormBuilder,private snackBar: MatSnackBar) {
  this.personnelForm = this.fb.group({
    nom: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    prenom: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    adresse: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    numTelephone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    poste: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    idcnss: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    enfantsacharge: ['', [Validators.required, Validators.min(0)]],
    grade: ['', Validators.required],
    categorie: ['', Validators.required],
    role: ['', Validators.required],
    //soldeconge: [{ value: 30, disabled: true }, [Validators.required]],
  });
}

showSuccessMessage(action: string) {
  this.snackBar.open(`Personnel ${action} avec succès!`, 'Fermer', {
    duration: 3000, // Durée en millisecondes
  });
}

/*onSubmit(): void {
  if (this.personnelForm.valid) {
    const personnelData: Personnel = { ...this.selectedPersonnel, ...this.personnelForm.value };
    
    if (this.selectedPersonnel?.id) {
      // Si un personnel est sélectionné, mettez à jour
      this.updatePersonnel(personnelData);
    } else {
      // Sinon, ajoutez un nouveau personnel
      this.addPersonnel(personnelData);
    }
  } else {
    this.checkFormErrors();
  }
}*/

onSubmit(): void {
  if (this.personnelForm.valid) {
    // Prepare the personnel data, wrapping the role in an object
    const personnelData: Personnel = {
      ...this.selectedPersonnel,
      ...this.personnelForm.value,
      role: { id: this.personnelForm.get('role')?.value }  // Wrap the role ID in an object
    };

    if (this.selectedPersonnel?.id) {
      // Si un personnel est sélectionné, mettez à jour
      this.updatePersonnel(personnelData);
      this.showSuccessMessage('modifié');
      this.getPersonnels()
    } else {
      // Sinon, ajoutez un nouveau personnel
      this.addPersonnel(personnelData);
      this.showSuccessMessage('ajouté');
      this.getPersonnels()
    }
  } else {
    this.checkFormErrors();
  }
}


  ngOnInit(): void {
    this.getPersonnels();
    this.resetSelectedPersonnel();
    this.getRoles();
    console.log(this.personnelForm.value); // Vérifiez les valeurs
    console.log(this.personnelForm); 
  }

  getPersonnels(): void {
    this.personnelService.getpersonnel().subscribe(data => {
      this.personnels = data;
      console.log(data)
    });
  }

  getRoles(): void {
    this.personnelService.getRoles().subscribe(data => {
      this.roles = data;
      console.log('Rôles récupérés :', this.roles);
    });
  }

  
  addPersonnel(personnel: Personnel): void {
    console.log("Données à envoyer :", personnel); // Affiche les données à envoyer
    this.personnelService.createPersonnel(personnel).subscribe(() => {
      console.log("ok ok ");
      // this.getPersonnels();
      // this.resetSelectedPersonnel(); // Réinitialise la sélection
    }, error => {
      console.error('Erreur lors de l\'ajout :', error);
      console.error('Détails de l\'erreur :', error.error);
    });
  }
  

  
  checkFormErrors() {
    Object.keys(this.personnelForm.controls).forEach(key => {
      const control = this.personnelForm.get(key);
      if (control?.invalid) {
        console.error(`Champ invalide : ${key}`, control.errors);
      }
    });
  }

  /*editPersonnel(personnel: Personnel): void {
    this.selectedPersonnel = { ...personnel }; // Crée une copie de l'objet
    this.personnelForm.patchValue(this.selectedPersonnel); 
  }*/

  editPersonnel(personnel: Personnel): void {
    this.selectedPersonnel = { ...personnel }; // Create a copy of the object
    this.personnelForm.patchValue({
      ...this.selectedPersonnel,
      role: personnel.role?.id // Set the role based on the selected personnel
    });
    //this.isFormVisible = true;
  }
  

  updatePersonnel(personnel: Personnel): void {
    if (personnel.id) {
      console.log("Données à mettre à jour :", personnel);
      this.personnelService.updatePersonnel(personnel.id, personnel).subscribe(() => {
        this.getPersonnels();
        this.resetSelectedPersonnel(); // Réinitialise la sélection
        this.personnelForm.reset();
        this.personnelForm.markAsPristine(); // Réinitialise l'état "pristine"
        this.personnelForm.markAsUntouched();
      });
    }
  }
  hideForm() {
    this.isFormVisible = false; // Masquez le formulaire
    this.selectedPersonnel = null; // Réinitialisez le personnel sélectionné
    this.personnelForm.reset(); // Réinitialisez le formulaire
  }
  
  


  deletePersonnel(id: number | undefined): void {
    if (id !== undefined) {
      this.personnelService.deletePersonnel(id).subscribe(() => {
        this.getPersonnels();
      });
    } else {
      console.error('ID de personnel manquant');
    }
  }

}
