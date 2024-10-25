
export interface Offre {        // ID optionnel si c'est généré par l'API
    id : number;
    titre: string;
    details: string;
    localisation: string;
    typeContrat: string;
    exigences:string;
    datePub:any;
    datefin:any;
  }