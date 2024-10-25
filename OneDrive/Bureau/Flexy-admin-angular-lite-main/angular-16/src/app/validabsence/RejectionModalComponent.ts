// rejection-modal.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-rejection-modal',
    template: `
      <mat-dialog-content>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Merci de fournir la raison de rejet de cette demande conge:</mat-label>
          <textarea matInput [(ngModel)]="reason" rows="4"></textarea>
        </mat-form-field>
      </mat-dialog-content>
      <mat-dialog-actions class="dialog-actions">
        <button mat-button color="warn" (click)="onCancel()">Cancel</button>
        <button mat-button color="primary" (click)="onSubmit()">Submit</button>
      </mat-dialog-actions>
    `,
    styles: [`
      .full-width {
        width: 400px;
        height:100px
      }
      .dialog-actions {
        display: flex;
        justify-content: center; /* Center the buttons horizontally */
        margin-top: 16px; /* Add some spacing if needed */
      }
    `]
  })
export class RejectionModalComponent {
  reason: string = '';

  constructor(private dialogRef: MatDialogRef<RejectionModalComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.reason);
  }
}
