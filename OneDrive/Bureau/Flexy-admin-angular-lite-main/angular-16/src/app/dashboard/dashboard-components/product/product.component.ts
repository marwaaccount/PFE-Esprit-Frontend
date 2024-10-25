import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonnelService } from 'C:/Users/hamza/OneDrive/Bureau/Flexy-admin-angular-lite-main/angular-16/src/app/personnel.service';
import{FicheService} from 'C:/Users/hamza/OneDrive/Bureau/Flexy-admin-angular-lite-main/angular-16/src/app/fiche.service'



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
  dataSource :any[] = [];
  

  constructor(private FicheService: FicheService, private PersonnelService: PersonnelService,private router: Router) { }

  goListFiche(cin:number,id:number): void {
    console.log("cin", cin);
    this.router.navigate(['/liste-fiches',cin,id]);
      }
 

  ngOnInit() {
    this.PersonnelService.getpersonnel().subscribe(
      (datas: any) => {
        this.dataSource = datas;

  },);

}

}
