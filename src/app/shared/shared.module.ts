import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmLogoutDialogComponent } from './dialogs/confirm-logout-dialog/confirm-logout-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ConfirmLogoutDialogComponent, ConfirmDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [ConfirmLogoutDialogComponent],
})
export class SharedModule {}
