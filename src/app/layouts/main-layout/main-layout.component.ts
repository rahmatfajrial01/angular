import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmLogoutDialogComponent } from '../../shared/dialogs/confirm-logout-dialog/confirm-logout-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  name: string = '';
  role: number = -1;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUserNameFromToken();
  }

  loadUserNameFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode JWT token payload
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.name = payload.email || '';
        this.role = payload.role ?? -1;
      } catch (e) {
        console.error('Error decoding token', e);
      }
    }
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        localStorage.removeItem('token');
        this.snackBar.open('Logout berhasil!', 'Tutup', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
        this.router.navigate(['/auth/login']);
      } else {
        // user batal logout
        console.log('Logout dibatalkan');
      }
    });
  }
}
