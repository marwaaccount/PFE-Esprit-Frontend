import { Component, OnInit } from '@angular/core';
import { FicheService } from '../fiche.service';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent {

  title = 'fiche';
  fiches:  any[] = [];
  name: String='';
  ficheId:number=2; 

  constructor(private FicheService: FicheService) {}

  ngOnInit() {

  console.log('fiche id ',this.ficheId);
    
    this.FicheService.getfiches().subscribe(
      (datas: any) => {
      console.log("init....");
        this.fiches = datas;
      }
      
    );

 }
  } 

 

