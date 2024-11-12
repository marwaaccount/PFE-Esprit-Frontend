import { Role } from './role.model';

export interface Personnel {
    id?: number; // ID peut être optionnel lors de la création
    nom: string;
    prenom: string;
    adresse: string;
    email: string;
    motdepasse?: string; // Optionnel, selon vos besoins
    numTelephone: string;
    poste: string;
    grade: string;
    idcnss: number;
    cin: number;
    enfantsacharge: number; // Type modifié pour correspondre au type Java
    categorie?: string;
    }
  