export interface Candidature {
    id: number;
    offreId: number;
    candidatId: number;
    adresse?:string;
    cv?:string;
    cvfilename:string;
    email?:string;
    nom?:string;
    prenom?:string;
    num?:number;
    poste?:string;
    diplomes: Diplome[];
    experiences: Experience[]
  }

  export interface Diplome {
    id: number;
    faculte?: string;
    intitule?: string; // Optional field (nullable in JSON response)
    date?: string; // Optional field (nullable in JSON response)
}

export interface Experience {
  id: number;
  periode?: string; // Optional field (nullable in JSON response)
  nomSociete?: string; // Optional field (nullable in JSON response)
}

export interface candidatOffre{
  lettreDeMotivation?: File;
  lettredemotivationfilename: string;
  etat:string
}