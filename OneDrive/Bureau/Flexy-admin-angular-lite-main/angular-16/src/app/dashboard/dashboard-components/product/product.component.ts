import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonnelService } from 'src/app/personnel.service';
import{FicheService} from 'src/app/fiche.service'
import { Personnel } from 'src/app/components/gestionpersonnel/personnel.model';



export interface PeriodicElement {
  id: number;
  name: string;
  work: string;
  project: string;
  priority: string;
  badge: string;
  budget: string;
}



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'prenom','cin','liste-fiches'];
  dataSource :Personnel[] = [];
  

  constructor(private FicheService: FicheService, private PersonnelService: PersonnelService,private router: Router) { }

  goListFiche(cin:number,id:number): void {
    console.log("cin", cin);
    this.router.navigate(['/liste-fiches',cin,id]);
      }
 

/*   ngOnInit() {
    this.PersonnelService.getpersonnel().subscribe(
      (datas: any) => {
        this.dataSource = datas;

  },);

} */
ngOnInit() {
  const role  = localStorage.getItem("role");
  if (role?.includes('ADMIN')) {
    this.getPersonnels();

  }
  else{
    this.getPersonnelsbyId();
  }
}

getPersonnels(): void {
  this.PersonnelService.getpersonnel().subscribe((datas: any) => {
    this.dataSource = datas;
    console.log(datas)
  });
}

getPersonnelsbyId(): void {
  this.PersonnelService.getpersonnelbyId().subscribe((datas: any) => {
    this.dataSource = datas;
    console.log(datas)
  });
}

}
