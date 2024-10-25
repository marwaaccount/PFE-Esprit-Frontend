export class Fiche {
    date: any;
    nbheurestr: number = 0;
    nbheuressupp: number = 0;
  
    constructor( date: any, nbheurestr: number, nbheuressupp: number) {
      this.date = date;
      this.nbheurestr = nbheurestr;
      this.nbheuressupp = nbheuressupp;
    }
  }
  