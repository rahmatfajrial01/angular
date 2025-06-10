import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required], // misalnya ada password
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: () => {
          this.snackBar.open('User berhasil dibuat', 'Tutup', {
            duration: 3000,
          });
          this.router.navigate(['/user']);
        },
        error: (err) => {
          // this.snackBar.open('Gagal membuat user', 'Tutup', { duration: 3000 });
          const msg = err?.error?.message || 'Terjadi kesalahan.';
          this.snackBar.open(msg, 'Tutup', {
            duration: 3000,
            panelClass: ['snackbar-error'],
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          console.error(err);
        },
      });
    }
  }
}
