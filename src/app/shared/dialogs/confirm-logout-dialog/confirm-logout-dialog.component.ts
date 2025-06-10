import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-logout-dialog',
  template: `
    <h2 mat-dialog-title>Konfirmasi Logout</h2>
    <mat-dialog-content>Apakah Anda yakin ingin logout?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Batal</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">
        Logout
      </button>
    </mat-dialog-actions>
  `,
})
export class ConfirmLogoutDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmLogoutDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true); // kirim true saat logout
  }

  onCancel(): void {
    this.dialogRef.close(false); // kirim false saat batal
  }
}
