import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;
  loading = false;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''], // password optional di edit user, misal kalau mau ganti
    });

    this.loadUser();
  }

  loadUser() {
    this.loading = true;
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          name: user.name,
          email: user.email,
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Gagal memuat data user';
        this.loading = false;
      },
    });
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    const updatedUser = { ...this.userForm.value };
    // Kalau password kosong, hapus dari payload supaya backend tahu gak update password
    if (!updatedUser.password) {
      delete updatedUser.password;
    }

    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: () => {
        this.snackBar.open('User berhasil diperbarui', 'Tutup', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
        this.router.navigate(['/user']);
      },
      error: (err) => {
        // this.snackBar.open('Gagal memperbarui user', 'Tutup', {
        //   duration: 3000,
        //   verticalPosition: 'top',
        //   horizontalPosition: 'right',
        // });
        const msg = err?.error?.message || 'Terjadi kesalahan.';
        this.snackBar.open(msg, 'Tutup', {
          duration: 3000,
          panelClass: ['snackbar-error'],
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
        console.log(err);
      },
    });
  }
}
