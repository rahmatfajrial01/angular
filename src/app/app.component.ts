// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent {
//   sidebarVisible = true;
//   sidebarUnfoldable = false;
//   sidebarMinimized = false;

//   toggleSidebar() {
//     this.sidebarVisible = !this.sidebarVisible;
//   }

//   public navItems = [
//     {
//       name: 'Home',
//       url: '/',
//       iconComponent: { name: 'cil-speedometer' },
//     },
//     {
//       name: 'User',
//       url: '/user',
//       iconComponent: { name: 'cil-user' },
//     },
//   ];
// }

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogoutDialogComponent } from './shared/dialogs/confirm-logout-dialog/confirm-logout-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}
  logout() {
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // user klik Logout, lakukan aksi logout
        console.log('Logout berhasil');
        // contoh: localStorage.clear(); this.router.navigate(['/login']);
      } else {
        // user batal logout
        console.log('Logout dibatalkan');
      }
    });
  }
  title = 'tes';
}
