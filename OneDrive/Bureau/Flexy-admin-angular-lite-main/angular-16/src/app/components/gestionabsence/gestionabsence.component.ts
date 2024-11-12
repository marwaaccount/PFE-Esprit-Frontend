import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbsenceService } from 'src/app/absence.service';
import { demandeAbscence } from '../gestionabsence/demandeAbscence.model';

@Component({
  selector: 'app-gestionabsence',
  templateUrl: './gestionabsence.component.html',
  styleUrls: ['./gestionabsence.component.scss']
})

export class GestionabsenceComponent {

  demandeCongeForm!: FormGroup;
  typesDeConge = ['Conge Annuel', 'Maladie', 'Autre',];
  soldeConge : any;
  periode :any;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  datasource:demandeAbscence[] = [];
  selectedRequestId: number | null = null; // Ajoutez ceci au début de votre classe
   idUser  =  Number(localStorage.getItem("idUser"));

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,private route: ActivatedRoute,private router: Router,private abscenceservice :AbsenceService) {
    this.demandeCongeForm = this.fb.group({
      type: ['', Validators.required],
      datedebut: ['', Validators.required],
      datefin: ['', Validators.required],
      justificatif: [''],
    },{ validator: this.dateValidator.bind(this) });
  }
  ngOnInit(): void {

    this.abscenceservice.getSoldeConge(this.idUser).subscribe(
      (response) => {
       
         console.log(response);
       this.soldeConge=response;
      
      },
      (error: any) => {
       
      }
    );
    this.fetchLeaveRequests();
  }

  onSubmit() {
    if (this.demandeCongeForm.valid) {
      console.log('hehiiii');
      const demande = this.demandeCongeForm.value;
      this.calculatePeriod();
      if (this.soldeConge > 0 && this.periode <= this.soldeConge) {
        console.log('hehiiii1');
        demande.datedebut = this.convertDateFormat(demande.datedebut);
        demande.datefin = this.convertDateFormat(demande.datefin);
        
        if (this.selectedRequestId) {
          // Si une demande est sélectionnée, mettre à jour la demande
          console.log('hehiiii3');
          this.abscenceservice.updateRequest(this.selectedRequestId, demande).subscribe(
            (response) => {
              console.log('Demande de congé modifiée :', demande);
              this.openSnackBar('Demande de congé modifiée avec succès !', 'Fermer');
              this.resetForm();
              this.fetchLeaveRequests();
            },
            (error) => {
              this.errorMessage = 'Erreur lors de la modification de la demande.';
              this.successMessage = null;
              console.error('Erreur lors de la modification de la demande:', error);
            }
          );
          console.log(demande);
        } else {
          // Sinon, créer une nouvelle demande
          this.abscenceservice.addRequest(this.idUser, demande).subscribe(
            (response) => {
              console.log(demande);
              alert('Demande de congé soumise :'+ demande);
              this.openSnackBar('Demande de congé soumise avec succès !', 'Fermer');
              this.fetchLeaveRequests();
              this.resetForm();
            },
            (error) => {
              this.errorMessage = 'Erreur lors de la création de la demande.';
              this.successMessage = null;
              alert('Erreur lors de la création de la demande:'+ error);
            }
          );
        }
      }
     
    }
  }
  
  resetForm() {
    this.demandeCongeForm.reset();
    this.selectedRequestId = null; // Réinitialisez l'ID de la demande sélectionnée
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


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000, // durée en ms
    });
  }


  isValidDate(dateString: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Format YYYY-MM-DD
    return regex.test(dateString);
  }

  dateValidator(formGroup: FormGroup) {
    const dateDebutControl = formGroup.get('datedebut');
    const dateFinControl = formGroup.get('datefin');
    const today = new Date();
    const twoYearsFromNow = new Date();
    twoYearsFromNow.setFullYear(today.getFullYear() + 2); // Date limite : aujourd'hui + 2 ans
  
    // Validation de la date de début
    if (dateDebutControl && dateDebutControl.value) {
      const dateDebutString = dateDebutControl.value;
  
      // Vérifiez le format de la date avant de créer un objet Date
      if (!this.isValidDate(dateDebutString)) {
        dateDebutControl.setErrors({ dateInvalide: true });
      } else {
        const dateDebut = new Date(dateDebutString);
        if (isNaN(dateDebut.getTime()) || dateDebut < today || dateDebut > twoYearsFromNow) {
          dateDebutControl.setErrors({ dateInvalide: true });
        } else {
          dateDebutControl.setErrors(null);
        }
      }
    }
  
    // Validation de la date de fin
    if (dateFinControl && dateFinControl.value) {
      const dateFinString = dateFinControl.value;
  
      // Vérifiez le format de la date avant de créer un objet Date
      if (!this.isValidDate(dateFinString)) {
        dateFinControl.setErrors({ dateInvalide: true });
      } else {
        const dateFin = new Date(dateFinString);
        if (isNaN(dateFin.getTime()) || dateFin <= new Date(dateDebutControl?.value) || dateFin > twoYearsFromNow) {
          dateFinControl.setErrors({ dateInvalide: true });
        } else {
          dateFinControl.setErrors(null);
        }
      }
    }
  }
  
  calculatePeriod() {
    console.log("Calculer la période");
    const dateDebutString = this.demandeCongeForm.get('datedebut')?.value;
    const dateFinString = this.demandeCongeForm.get('datefin')?.value;
  
    console.log("Dates saisies:", dateDebutString, dateFinString);
  
    if (dateDebutString && dateFinString) {
      const dateDebut = this.convertToDate(dateDebutString);
      const dateFin = this.convertToDate(dateFinString);
  
      if (dateDebut && dateFin) {
        const diffTime = Math.abs(dateFin.getTime() - dateDebut.getTime());
        this.periode = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
  
        alert(`La période entre les deux dates est de ${this.periode} jours.`);
      } else {
        alert("Erreur lors de la conversion des dates.");
      }
    } else {
      alert("Les dates ne doivent pas être vides.");
    }
  }
  
  
// Helper method to convert date string to Date object
convertToDate(dateString: string): Date | null {
  const parts = dateString.split('-'); // Assuming format is YYYY-MM-DD
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JS
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);

    if (!isNaN(date.getTime())) { // Check if date is valid
      return date;
    } else {
      console.error("Date invalide:", dateString);
    }
  }
  return null;
}

fetchLeaveRequests() {
  console.log(this.datasource);
  this.abscenceservice.getAllRequests().subscribe(
    (requests) => {
      this.datasource= requests;
      console.log('Fetched leave requests:', this.datasource);
    },
    (error) => {
      console.error('Error fetching leave requests:', error);
    }
  );
}


onDelete(id: number) {
  console.log(id);
  this.abscenceservice.deleteRequest(id).subscribe(
    () => {
      console.log('Demande supprimée');
       this.fetchLeaveRequests();
    },
    (error) => {
      console.error('Erreur lors de la suppression', error);
    }
  );
}



onEdit(request: demandeAbscence) {
  const formattedDateDebut = this.formatDateForInput(new Date(request.datedebut));
  const formattedDateFin = this.formatDateForInput(new Date(request.datefin));
  // Pré-remplir le formulaire avec les données de la demande sélectionnée
  this.demandeCongeForm.patchValue({
    type: request.type,
    datedebut: formattedDateDebut,
    datefin: formattedDateFin,
    justificatif: request.justificatif,
  });
  console.log(request.datedebut);
  this.demandeCongeForm.updateValueAndValidity();
  //console.log(this.datedebut)
  // Vous pouvez également stocker l'ID de la demande pour l'utilisation lors de l'envoi
  this.selectedRequestId = request.id; // Assurez-vous de déclarer this.selectedRequestId dans votre classe
  
}
formatDateForInput(date: Date): string {
  // Format the date to YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

}
