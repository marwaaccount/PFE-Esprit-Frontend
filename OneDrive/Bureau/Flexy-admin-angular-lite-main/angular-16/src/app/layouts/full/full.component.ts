import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit{

  search: boolean = false;
  nom!: String;
  sidebarMenu: sidebarMenu[] = [];

  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    this.nom = localStorage.getItem("nom") || ''; // Get the name from localStorage
    const role  = localStorage.getItem("role");
    if (role?.includes('ADMIN')) {
      this.router.navigate(['table']);
      this.sidebarMenu = [
        { link: "/table", icon: "grid", menu: "Fiche de paie" },
        { link: "/expansion", icon: "divide-circle", menu: "Liste des offres" },
        { link: "/tooltip", icon: "bell", menu: "liste des personnels" },
        { link: "/snackbar", icon: "slack", menu: "demande de congé" },
        { link: "/slider", icon: "sliders", menu: "Demande de Congé en attente" }
      ];
    } else if (role?.includes('PERS')){
      this.sidebarMenu = [
        { link: "/home", icon: "home", menu: "chercher un emplois" },
        { link: "/table", icon: "grid", menu: "Fiche de paie" },
        { link: "/expansion", icon: "divide-circle", menu: "Liste des offres" },
        { link: "/tooltip", icon: "bell", menu: "liste des personnels" },
        { link: "/snackbar", icon: "slack", menu: "demande de congé" },
        { link: "/slider", icon: "sliders", menu: "Demande de Congé en attente" }
      ];
    }else{
      this.sidebarMenu = [
        { link: "/home", icon: "home", menu: "chercher un emplois" }
      ];
    }
   }
  ngOnInit(): void {
    this.nom = localStorage.getItem("nom") || ''; // Get the name from localStorage


    }

  routerActive: string = "activelink";
  async logout(){
    await localStorage.clear()
    await this.router.navigate(['redirTohome']);
    await location.reload();

}
  Account(){
    this.router.navigate(['profil']);

  }
  Change(){
    this.router.navigate(['change']);
  }
  Login(){
    this.router.navigate(['login']);

  }

}
