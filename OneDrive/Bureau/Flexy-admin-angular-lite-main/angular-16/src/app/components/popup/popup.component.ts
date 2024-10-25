import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FicheService } from 'src/app/fiche.service';
import { Fiche } from 'src/app/fiche/fiche.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  ficheForm: FormGroup;
  fiche: Fiche;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number, mode: 'add' | 'edit', name: string, nbheurestr: number, nbheuressupp: number, date: string, id: number },
    private ficheService: FicheService,
    private fb: FormBuilder
  ) {
    this.fiche = new Fiche(new Date(), 0, 0);
    
    // Initialisation du formulaire
    this.ficheForm = this.fb.group({
      date: ['', Validators.required],
      nbheurestr: [0, [Validators.required, Validators.min(0)]],
      nbheuressupp: [0, [Validators.required, Validators.min(0)]]
    });

    if (this.data.mode === 'edit') {
      // Pré-remplir les champs avec les données existantes
      this.ficheForm.patchValue({
        nbheurestr: this.data.nbheurestr,
        nbheuressupp: this.data.nbheuressupp,
        date: this.convertDateToDMY(this.data.date)
      });
    }
  }
  
  padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }
  convertDateFormat(dateInput: string | Date): string {
    let date: Date;
  
    // Si l'entrée est déjà une instance de Date, on l'utilise directement
    if (dateInput instanceof Date) {
      date = dateInput;
    } else if (typeof dateInput === 'string') {
      // Vérifiez le format de la chaîne
      const parts = dateInput.split('-');
      if (parts.length !== 3) {
        throw new Error('Invalid date format. Expected format: YYYY-MM-DD');
      }
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];
  
      date = new Date(`${year}-${month}-${day}`);
    } else {
      throw new Error('Invalid date input'); // Gérer les autres types
    }
  
    // Vérifiez si la date est valide
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
  
    // Formatage de la date
    return `${date.getFullYear()}-${this.padNumber(date.getMonth() + 1)}-${this.padNumber(date.getDate())}T${this.padNumber(date.getHours())}:${this.padNumber(date.getMinutes())}:${this.padNumber(date.getSeconds())}`;
  }
  
  

  convertDateToDMY(date: string): string {
    const ladate = new Date(date);
    if (isNaN(ladate.getTime())) {
      throw new Error('Invalid date');
    }
    return `${ladate.getFullYear()}-${String(ladate.getMonth() + 1).padStart(2, '0')}-${String(ladate.getDate()).padStart(2, '0')}`;
  }

  actionFiche(): void {
    if (this.ficheForm.invalid) {
      return; // Ne pas procéder si le formulaire est invalide
    }

   // this.fiche.date = this.ficheForm.value.date;
    this.fiche.date = this.convertDateFormat(this.ficheForm.value.date);
    this.fiche.nbheurestr = this.ficheForm.value.nbheurestr;
    this.fiche.nbheuressupp = this.ficheForm.value.nbheuressupp;
    console.log(this.fiche.date)
    console.log(this.fiche.nbheuressupp)
    console.log(this.fiche.nbheurestr)

    if (this.data.mode === 'add') {
      this.ficheService.addFiche(this.data.userId, this.fiche).subscribe(
        response => {
          console.log('Fiche ajoutée avec succès:', response);
        },
        error => {
          console.log("ci joint les donnees a ajouter"+this.fiche.date)
          console.log(this.fiche.nbheuressupp)
          console.log(this.fiche.nbheurestr)
          console.log(this.fiche)
          console.error('Erreur lors de l\'ajout de la fiche:', error);
        }
      );
    } else if (this.data.mode === 'edit') {
      this.ficheService.modiffiche(this.data.id, this.fiche).subscribe(
        response => {
          console.log('Fiche modifiée avec succès:', response);
        },
        error => {
          console.error('Erreur lors de la modification de la fiche:', error);
        }
      );
    }

    // Fermer le dialogue après l'ajout ou la modification
    this.dialogRef.close();
  }

  validateDate() {
    const dateControl = this.ficheForm.get('date');
    const selectedDate = new Date(dateControl?.value);
    const startDate = new Date('2023-12-31');
    const currentDate = new Date();
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    if (dateControl) {
      if (selectedDate < startDate || selectedDate > endDate) {
        dateControl.setErrors({ invalidDate: true });
      } else {
        dateControl.updateValueAndValidity();
      }
    }

  }
  isDateControlInvalid(): boolean {
    const dateControl = this.ficheForm.get('date');
    return dateControl ? dateControl.invalid && dateControl.touched : false;
  }
}
