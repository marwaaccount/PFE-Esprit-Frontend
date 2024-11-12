import jsPDF from 'jspdf';
import { Component, OnInit } from '@angular/core';
import{FicheService} from 'src/app/fiche.service'
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';



@Component({
  selector: 'app-listefiche',
  templateUrl: './listefiche.component.html',
  styleUrls: ['./listefiche.component.scss']

})

export class ListeficheComponent  implements OnInit {

  displayedColumns: string[] = ['Date','salaire net','fiche.pdf','supprimer','modifier'];
  dataSource :any[] = [];
  userId : any=0;
  name:String="";
  cina: number | null = null;
  noFicheMessage: boolean = false;
  constructor(private FicheService: FicheService,private route: ActivatedRoute,public dialog: MatDialog) { }

  generatePDF(name:String,salaire:number,nbh:number,nbhs:number,remh:number,remhsupp:number,indem:number,cot:number,retcnss:number,date:Date) {
   const doc = new jsPDF();
    doc.setFontSize(16);
    const title = `Fiche de paie de `;
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (doc.internal.pageSize.width - titleWidth) / 2, 15);
 
    const nameEmpl= ` ${name}`.toUpperCase();
    const nameWidth = doc.getTextWidth(title);
    doc.text(nameEmpl, (doc.internal.pageSize.width - nameWidth) / 2, 25);
    const currentDate = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
    doc.setFontSize(12);

       const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    const formattedDate = dateObj.toLocaleDateString('fr-FR', options);
    
    doc.setFontSize(12);
    doc.text(`Mois de  : ${formattedDate}`, 10, 60);

  
    const headers = ["Détails", "Montants"];
    const data = [
        ["Nombre d'heures travaillées", nbh],
        ["Nombre d'heures supplémentaires", nbhs],
        ["Rémunération heures", remh],
        ["Rémunération heures supplémentaires", remhsupp],
        ["Indemnité transport", indem],
        ["Cotisation accident", cot],
        ["Retenue CNSS", retcnss],
        ["Salaire net", salaire]
    ];

    let startY = 90; // Augmenter la position pour donner plus d'espace
    const cellWidth = 85;
    const rowHeight = 10;

    // Dessiner les en-têtes
    doc.setFontSize(12);
    headers.forEach((header, i) => {
        const x = 10 + i * cellWidth;
        const y = startY - rowHeight;
        doc.text(header, x + cellWidth / 2, y + rowHeight / 2, { align: 'center', baseline: 'middle' });
        // Dessiner une bordure pour l'en-tête
        doc.rect(x, y - rowHeight, cellWidth, rowHeight);
    });

    // Dessiner les lignes du tableau
    data.forEach((row, index) => {
        const y = startY + (index + 1) * rowHeight;
        row.forEach((cell, i) => {
            const x = 10 + i * cellWidth;
            doc.text(cell.toString(), x + cellWidth / 2, y + rowHeight / 2, { align: 'center', baseline: 'middle' });
            // Dessiner une bordure pour chaque cellule
            doc.rect(x, y - rowHeight, cellWidth, rowHeight);
        });
    });

    // Dessiner une bordure autour du tableau
    const totalHeight = startY + (data.length + 1) * rowHeight;
    doc.rect(10, startY - rowHeight, cellWidth * headers.length, totalHeight - startY + rowHeight);
    const signatureText = "Signature de la société";
    const signatureY = doc.internal.pageSize.height - 50; // Position Y pour la signature
    const signatureWidth = doc.getTextWidth(signatureText);
    doc.text(signatureText, (doc.internal.pageSize.width - signatureWidth) / 2, signatureY);
    // Sauvegarde du fichier PDF avec un nom spécifique
    doc.save(`${name}_fiche_de_paie.pdf`);
}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // Récupérer le paramètre 'id' de l'URL
      const cin = params.get('cin');
      this.cina = cin? Number(cin) : null;

      this.userId= params.get('id');
      console.log(cin);

      if (cin) {
       
        const cinp = Number(cin); // Convertit en nombre
        
        this.FicheService.findName(cinp).subscribe(
          (response: string) => {
        
            this.name = response; // Stockez le nom récupéré
            console.log(this.name);
            console.log(cin);
          },
          (error) => {
            console.error('Erreur lors de la récupération du nom:', error);
          }
        );
      } else {
        console.error('Le paramètre cin est manquant ou invalide.');
      }
      console.log(this.name);

      // Utiliser le service FicheService pour récupérer les données en fonction de 'cin'
      if (cin) {
        this.FicheService.listeficheparPersonnel(parseInt(cin, 10)).subscribe(
          (datas: any) => {
            this.dataSource = datas;
            console.log('init ',this.dataSource);

            if (!this.dataSource || this.dataSource.length === 0) {
              this.noFicheMessage = true; // Afficher le message d'absence de fiche
          } else {
              this.noFicheMessage = false; // Réinitialiser le message si des fiches sont trouvées
          }
            
          },
          error => {
            console.error('Erreur lors de la récupération des données : ', error);
            // Gérer les erreurs si nécessaire
          }
        );
      } 
    });
  }
  openPopup(userId: string,mode: 'add',name:String): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { userId ,mode,name} // Passer l'ID d'utilisateur en tant que données au composant de popup
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Logique après la fermeture du dialogue si nécessaire
      this.ngOnInit();
    });
}

openPopupModif(userId: string,mode:'edit',nbheuressupp:number,nbheurestr:number,date:string,id:number,name:String): void {
  const dialogRef = this.dialog.open(PopupComponent, {
    data: { userId ,mode, nbheuressupp, nbheurestr,date,id,name} // Passer l'ID d'utilisateur en tant que données au composant de popup
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // Logique après la fermeture du dialogue si nécessaire
    this.ngOnInit();
  });
}

  supprimer(id: number): void {
    this.FicheService.deletefiche(id)
      .subscribe(
        () => {
          console.log('Fiche supprimée avec succès');
          console.log(id);
          // Mettez à jour l'interface utilisateur après la suppression si nécessaire
          this.ngOnInit();
        },
        error => {
          console.error('Erreur lors de la suppression de la fiche:', error);
          // Gérer l'erreur côté front-end (par exemple, afficher un message d'erreur à l'utilisateur)
        }
      );
  }
 
  

}
