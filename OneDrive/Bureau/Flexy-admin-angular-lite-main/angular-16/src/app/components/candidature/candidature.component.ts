
import { ChangeDetectorRef, Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { entretien} from '../candidature/entretien.model';
import { Candidature } from '../candidature/candidature.model';
import{OffreService} from 'src/app/offre.service'
import { CandidatOffreService } from 'src/app/candidatoffre.service';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.scss']
})
export class CandidatureComponent {
  offreId!: number;
  candidatures: Candidature[] = []; 
  titreOffre:string='';
  error: string | null = null; // 
  objectURLs: { [key: string]: string | null } = {}; // Store object URLs
   // Properties for modal handling

  showApproveModal = false;
  selectedCandidature: any;
  interviewDate: string = '';
  interviewLocation: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;
  entretien: entretien = { 
    date: '',
    lieu: '',
    etat: ''
  };
  constructor(private route: ActivatedRoute,private router: Router,private offreservice :OffreService,private cdref: ChangeDetectorRef,private CandidatOffreService :CandidatOffreService) {}

  ngOnInit(): void {
    
    }
    ngAfterViewInit() {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
       // const offreTitre=params.get('offreTitre');
        if (id !== null) {
          this.offreId = +id;  // Convert string to number
          // Maintenant vous pouvez utiliser l'ID pour charger les détails des candidatures
          console.log(this.offreId);
          this.loadCandidatures(this.offreId);
        } else {
          console.error('ID parameter is missing');
          // Handle the case when the ID is not provided
        }
      });


    this.route.queryParamMap.subscribe(queryParams => {
      this.titreOffre =this.titreOffre+queryParams.get('title');
      console.log('Titre Offre:', this.titreOffre);
  });
    }
  
    loadCandidatures(id: number): void {
      console.log("Loading candidatures for offreId:", this.offreId);
      
      this.offreservice.getOffre(this.offreId).subscribe(
        (candidatures: Candidature[]) => {
          console.log("Received candidatures:", candidatures);
          this.candidatures = candidatures; // Assign the array of candidatures
          
          this.candidatures.forEach(candidature => {
            if (candidature.cv) {
              // Use a known valid Base64 string for testing
              const base64String = candidature.cv.includes('base64,') ? 
                                   candidature.cv.split('base64,')[1] : 
                                   candidature.cv;
  
              try {
                // Decode the Base64 string
                const byteCharacters = atob(base64String);
                const byteNumbers = new Uint8Array(byteCharacters.length);
  
                // Convert the string to an array of bytes
                for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
  
                // Create a Blob from the byte array
                const blob = new Blob([byteNumbers], { type: 'application/pdf' });
                
                // Create a URL for the Blob
                const url = URL.createObjectURL(blob);
                this.objectURLs[candidature.id] = url; // Store the URL for downloading
                console.log(`Generated URL for candidature ${candidature.id}:`, url);
              } catch (error) {
                console.error(`Error decoding Base64 for candidature ${candidature.id}:`, error);
              }
            } else {
              console.warn(`Candidature ${candidature.id} does not have a CV.`);
            }
          });
        },
        (error) => {
          console.error('Error retrieving candidatures:', error);
          this.error = 'Error retrieving candidatures.';
        }
      );
    }
    base64ToBlob(base64: string, mimeType: string): Blob {
      // Remove the data URL scheme prefix, if present
      const base64Data = base64.replace(/^data:application\/pdf;base64,/, '');
      const byteCharacters = atob(base64Data);
      const byteArrays = [];
  
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
  
      return new Blob(byteArrays, { type: mimeType });
    }
    createObjectURL(blob: Blob): string {
      return URL.createObjectURL(blob);
    }
  
    // Make sure to clean up object URLs when they are no longer needed
    ngOnDestroy() {
      this.candidatures.forEach(candidature => {
        if (candidature.cv) {
          URL.revokeObjectURL(candidature.cv as any);
        }
    
      });
    }
    padNumber(num: number): string {
      return num.toString().padStart(2, '0');
    }
    convertDateFormat(dateString: string): string {
      // Split the dateString into year, month, and day
      const parts = dateString.split('-');
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];
    
      // Create a new Date object using the extracted parts
      const date = new Date(`${year}-${month}-${day}`);
    
      // Format the date to the desired format
      const formattedDate = `${date.getFullYear()}-${this.padNumber(date.getMonth() + 1)}-${this.padNumber(date.getDate())}T${this.padNumber(date.getHours())}:${this.padNumber(date.getMinutes())}:${this.padNumber(date.getSeconds())}`;
    
      return formattedDate;
    }

    isDateValid(): boolean {
      const today = new Date();
      const selectedDate = new Date(this.interviewDate);
      return selectedDate > today;
    }
     // Method to approve a candidature
  approuver(candidatId:number) {
    if (!this.isDateValid()) {
      alert('La date doit être supérieure à aujourd\'hui.');
      return;
    }
    this.entretien.date=this.convertDateFormat(this.interviewDate);
    this.entretien.lieu=this.interviewLocation;
    console.log('entretien',this.entretien);
    console.log(this.entretien.date,this.entretien.lieu)
    this.loadCandidatures(this.offreId);
    this.CandidatOffreService.approuver(this.offreId, candidatId,this.entretien).subscribe(
      (response) => {
        this.successMessage = 'Candidature approuvée avec succès.';
        this.errorMessage = null;
        this.closeApproveModal()
        console.log('Candidature approuvée:', response);
        this.CandidatOffreService.sendEmail('approve', candidatId,this.interviewDate, 
          this.interviewLocation).subscribe(
          () => console.log('Email d\'approbation envoyé avec succès.'),
          (error) => console.error('Erreur lors de l\'envoi de l\'email:', error)
          
      );
     // this.loadCandidatures(this.offreId);
      },
      (error) => {
        this.errorMessage = 'Erreur lors de l\'approbation de la candidature.';
        this.successMessage = null;
        console.error('Erreur lors de l\'approbation de la candidature:', error);
      }
    );
   //this.loadCandidatures(this.offreId);
  }
 
  rejeterCandidature(candidatId:number) {
    this.CandidatOffreService.rejeter(this.offreId,candidatId).subscribe(
      (response) => {
        this.successMessage = 'Candidature rejetée avec succès.';
        this.errorMessage = null;
        console.log('Candidature rejetée:', response);
        console.log(candidatId);
        this.CandidatOffreService.sendEmail('reject', candidatId,this.interviewDate, 
          this.interviewLocation).subscribe(
          () => console.log('Email de rejet envoyé avec succès.'),
          (error) => console.error('Erreur lors de l\'envoi de l\'email:', error)
      );
      this.loadCandidatures(this.offreId);
      },
      (error) => {
        this.errorMessage = 'Erreur lors du rejet de la candidature.';
        this.successMessage = null;
        console.error('Erreur lors du rejet de la candidature:', error);
      }
    );
   
  }
  openApproveModal(candidature: any) {
    this.selectedCandidature = candidature;
    this.showApproveModal = true;
  }

  // Method to close the approval modal
  closeApproveModal() {
    this.showApproveModal = false;
    this.selectedCandidature = null;
    this.loadCandidatures(this.offreId);
  }

  showDateError = false;
  showLocationError = false;
  
  

  checkRequiredFields() {
    this.showDateError = !this.interviewDate;
    this.showLocationError = !this.interviewLocation;
  }
    
      
      
      }
