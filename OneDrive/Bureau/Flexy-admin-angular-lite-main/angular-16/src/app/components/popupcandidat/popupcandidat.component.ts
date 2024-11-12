import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Component, Inject ,OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupcandidatService } from 'src/app/popupcandidat.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar';
type FileField = 'cv' | 'lettremotivation';
@Component({
  selector: 'app-popupcandidat',
  templateUrl: './popupcandidat.component.html',
  styleUrls: ['./popupcandidat.component.scss']
})
export class PopupcandidatComponent implements OnInit {


  applicationForm!: FormGroup;
  id!:number;
  isPopupVisible: boolean = true;
  files: any = {
    cv: null,
    lettremotivation: null
  };
 

  // Track file upload errors
  fileErrors: Record<FileField, boolean> = {
    cv: false,
    lettremotivation: false
  };

  constructor(private snackBar: MatSnackBar , private router: Router , private route: ActivatedRoute,private fb: FormBuilder, private PopupcandidatService: PopupcandidatService,public dialogRef: MatDialogRef<PopupcandidatComponent>,public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: { titre:string, id:number}) { }
    
   
      ngOnInit(): void {
        this.applicationForm = this.fb.group({
          candidatoffre: this.fb.group({
            //date: ['', Validators.required]
          }),
          candidat: this.fb.group({
            nom: ['', [Validators.required,Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
            prenom: ['', [Validators.required,Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
            adresse: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            num: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
            cv: [''],
          }),
          experience: this.fb.group({
            nomSociete: ['', Validators.required],
            periode: ['', [Validators.required,Validators.pattern(/^\d+$/)]]
          }),
          diplome: this.fb.group({
            faculte: ['', Validators.required]
          })
        });
        this.id=this.data.id;
        console.log("l id de l offre est le suivant"+this.id);
      }
      onFileChange(event: any, field: string): void {
        const file = event.target.files[0];
        if (file) {
          this.files[field] = file;
          this.fileErrors[field as FileField] = false// File uploaded successfully
        } else {
          this.fileErrors[field as FileField] = true; // No file uploaded
        }
      }
      fileInput(): void {
        
      }
      async  onSubmit(): Promise<void> {
    const formData = new FormData();
    let valid = true;

    // Check if files are uploaded
    if (!this.files.cv) {
      this.fileErrors.cv = true;
      valid = false;
      console.log(valid)
    }
    if (!this.files.lettremotivation) {
      this.fileErrors.lettremotivation = true;
      valid = false;
      console.log(false)
    }

    // If form is valid
    if (valid && this.applicationForm.valid) {
      Object.keys(this.applicationForm.value).forEach(key => {
        const value = this.applicationForm.value[key];
        if (typeof value === 'object' && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      formData.append('cv', this.files.cv);
      formData.append('lettremotivation', this.files.lettremotivation);

      this.PopupcandidatService.saveApplication(formData, this.id).subscribe(
        async response => {
          console.log('Application saved successfully:', response);
          const role  = localStorage.getItem("role");
          if (role?.includes('CONDI')){
            await this.router.navigate(['home']);
            this.isPopupVisible = false;
            this.snackBar.open(`Votre condidature avec succes`, 'Fermer', {
              duration: 3000, // Durée en millisecondes
            });
          }else{
            await this.router.navigate(['expansion']);
            this.isPopupVisible = false;
          }

          window.location.reload();
        },
        async error => {
          this.snackBar.open(`Merci de vous conncter a l'application`, 'Fermer', {
            duration: 3000, // Durée en millisecondes
          }); 
          await this.router.navigate(['login']);
          console.error('Error saving application:', error);
        }
      );
    } else {
      console.error('Form is invalid');
      this.markAllAsTouched();
    }
  }
      private markAllAsTouched() {
        Object.keys(this.applicationForm.controls).forEach(key => {
          const control = this.applicationForm.get(key);
          if (control) {
            control.markAsTouched();
          }
        });
      }
    }

  
    
    
    
  

