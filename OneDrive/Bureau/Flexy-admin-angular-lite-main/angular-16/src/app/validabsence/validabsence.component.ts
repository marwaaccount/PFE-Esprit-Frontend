import { Component, OnInit } from '@angular/core';
import { AbsenceService } from 'src/app/absence.service';
import { demandeAbsenceAtt } from './demandeAbsenceAtt.model'; 
import { MatDialog } from '@angular/material/dialog';
import { RejectionModalComponent } from 'C:/Users/hamza/OneDrive/Bureau/Flexy-admin-angular-lite-main/angular-16/src/app/validabsence/RejectionModalComponent';
@Component({
  selector: 'app-validabsence',
  templateUrl: './validabsence.component.html',
  styleUrls: ['./validabsence.component.scss']
})
export class ValidabsenceComponent implements OnInit {
  datasource: demandeAbsenceAtt[] = [];

  constructor(private absenceService: AbsenceService, private dialog: MatDialog,) {}

  ngOnInit() {
    this.getPendingRequests();
    
  }

  getPendingRequests() {
    this.absenceService.getAttenteRequests().subscribe(
      (requests: demandeAbsenceAtt[]) => {
        this.datasource = requests;
        console.log( ' hello Fetched leave requests:', this.datasource);
        console.log('Fetched leave requests:', this.datasource);

       },
      (error) => {
        console.error('Error fetching leave requests:', error);
      }
    );
  }

  onApprove(request: demandeAbsenceAtt) {
    const days = this.calculateDaysDifference(request.datedebut, request.datefin);
    console.log(request.id, days);
    this.absenceService.approveAbsence(request.id, days).subscribe(
      response => {
        console.log('Approval response:', response);
        this.getPendingRequests(); // Refresh the list
      },
      error => {
        console.error('Error approving request:', error);
      }
    );
  }

 /* onReject(request: demandeAbsenceAtt) {
    const motif = prompt('Enter the rejection reason:');
    if (motif) {
      this.absenceService.rejectAbsence(request.id, motif).subscribe(
        response => {
          console.log('Rejection response:', response);
          this.getPendingRequests(); // Refresh the list
        },
        error => {
          console.error('Error rejecting request:', error);
        }
      );
    }
  }*/
  onReject(request: demandeAbsenceAtt) {
    const dialogRef = this.dialog.open(RejectionModalComponent);
   
    dialogRef.afterClosed().subscribe(motif => {
      if (motif) {
        this.absenceService.rejectAbsence(request.id, motif).subscribe(
          response => {
            console.log('Rejection response:', response);
            this.getPendingRequests(); // Refresh the list
          },
          error => {
            console.error('Error rejecting request:', error);
          }
        );
      }
    });
  }
  
  

  private calculateDaysDifference(dateDebut: Date, dateFin: Date): number {
    const start = new Date(dateDebut);
    const end = new Date(dateFin);
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Inclut le dernier jour
  }
}
