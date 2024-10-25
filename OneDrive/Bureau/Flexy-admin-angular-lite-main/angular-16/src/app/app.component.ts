import { Component, OnInit } from '@angular/core';
import { FicheService } from './fiche.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [FicheService]
})
export class AppComponent implements OnInit {
  title = 'fiche';
  fiches:  any[] = [];

  constructor(private FicheService: FicheService) {}

  ngOnInit() {
    
  }
}
