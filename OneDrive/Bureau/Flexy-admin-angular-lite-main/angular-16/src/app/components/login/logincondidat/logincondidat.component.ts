import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Registrationrequest } from '../../models/Registrationrequest';
import { UserService } from '../../services/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-logincondidat',
  templateUrl: './logincondidat.component.html',
  styleUrls: ['./logincondidat.component.scss']
})
export class LogincondidatComponent {
  isLoginActive: boolean = false;
  loginForm: FormGroup;
  registerForm:FormGroup;
  submitted: boolean = false; // Add this line to track form submission
  favorite: string;
  public UserList = [] as any;
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 6000, // durée en ms
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    private userservice: UserService,
    private router: Router  ,private snackBar: MatSnackBar) {
    this.favorite = ''; 
    const formControls = {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    };
    this.loginForm = this.formBuilder.group(formControls);
    const formControls1 = {
      name : new FormControl('', [
        Validators.required,
       ]),
      username : new FormControl('', [
       Validators.required,
      ]),
      password : new FormControl('', [
        Validators.required,
       ])
      };
      this.registerForm = this.formBuilder.group(formControls1);
  }

  ngOnInit(): void {}

  get f() { return this.loginForm.controls; }
  async register(){

    const dataregister = this.registerForm.value;
    let registrationrequest;
      registrationrequest = new Registrationrequest(dataregister.name,dataregister.username,dataregister.password,"ROLE_CONDI");
    console.log(registrationrequest);
      await this.userservice.postUser(registrationrequest).subscribe(
      res => {
        console.log(res);
        this.toggleLogin();
        this.openSnackBar('inscription faite avec  avec succès !', 'Fermer');

      },
      err => {
        console.log(err);
      }
    );
  }
  async login() {
    this.submitted = true; // Mark the form as submitted

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const data = this.loginForm.value;
  
    await this.userservice.login(data.username, data.password).subscribe(
      
      async res => {
        console.log(res);
        let Authorization = res.bearer;
        localStorage.setItem('Authorization', Authorization);
        const decodedToken: any = jwtDecode(Authorization);
        console.log(decodedToken);
        localStorage.setItem('idUser', decodedToken.idUser); // Adjust based on your token structure
        localStorage.setItem('role', JSON.stringify(decodedToken.role)); // If roles are an array
        localStorage.setItem('nom', decodedToken.nom); // If roles are an array

        const IdUser  = decodedToken.idUser;
        const role = decodedToken.role;
        const user = decodedToken.nom;
        console.log('User  ID:', IdUser );
        console.log('Role:', role);
        if (role === 'ROLE_CONDI') {
          await this.router.navigate(['redirTohome']);
        }
        await location.reload();
      },
      err => {
       // Swal.fire('Oops...', 'Something went wrong!', 'error'); // Use Swal.fire for SweetAlert
       this.snackBar.open(`Votre mot de passe ou votre mail est incorrect !`, 'Fermer', {
        duration: 3000, // Durée en millisecondes
      });          }
    ); 
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  toggleLogin() {
    this.isLoginActive = true;
  }

  toggleSignup() {
    this.isLoginActive = false;
  }
}

