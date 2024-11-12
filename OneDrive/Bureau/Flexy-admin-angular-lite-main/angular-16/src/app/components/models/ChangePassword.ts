export class ChangePassword {
    id :number;
    passwordold: string;
    password: string;
  
    constructor(
    id:number,
     passwordold: string,
      password: string
      ) {
        this.id=id
        this.passwordold=passwordold
        this.password=password
      }
  }