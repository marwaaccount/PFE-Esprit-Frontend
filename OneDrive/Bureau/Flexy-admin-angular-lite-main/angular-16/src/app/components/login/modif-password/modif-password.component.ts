import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Personnel } from '../../gestionpersonnel/personnel.model';
import { ChangePassword } from '../../models/ChangePassword';
import { ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-modif-password',
  templateUrl: './modif-password.component.html',
  styleUrls: ['./modif-password.component.scss']
})
export class ModifPasswordComponent implements OnInit  {
  registerForm: FormGroup;
  personnels: Personnel[] = [];
  changePassword: ChangePassword[] = [];
  constructor(private profilService: ProfilService, private router: Router, private route: ActivatedRoute,private snackBar: MatSnackBar) {
    this.registerForm = new FormGroup({
      passwordold: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  
  }
  ngOnInit(): void {
    const idUser  = localStorage.getItem("idUser");
    const idClient = localStorage.getItem("idclient");

/*     // Fetch data using the service
    this.profilService.getDataById().subscribe((data: any) => {
      console.log(data);
      this.personnels = data;
      this.registerForm.patchValue({
        passwordold: data.motdepasse,
       });
    });   */
  }


  async changepwd(){
    
    const idUser  = localStorage.getItem("idUser");

    console.log(this.personnels);
    if (this.registerForm.valid) {
        // Update existing personnel
        const personnel: any = {
          id: Number(idUser),
          passwordold: this.registerForm.value.passwordold,
          password: this.registerForm.value.password
        };      
           await this.profilService.updatePWD(personnel).subscribe(
            (data: any) => {
          console.log('Form submitted successfully');
/*           this.registerForm.patchValue({
            passwordold: data.passwordold,
            password: data.password
          }); */
          localStorage.clear();
          this.snackBar.open(`Modification  avec succès! merci de vous reconnecté !`, 'Fermer', {
            duration: 3000, // Durée en millisecondes
          });        
          this.router.navigate(['login']);

        },
        (error: any) => {
          console.error('Error submitting form', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  
  }
}
