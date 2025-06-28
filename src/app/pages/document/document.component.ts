import { Component, OnInit } from '@angular/core';
import { DocumentService, Document } from '../../services/document.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { environment } from 'src/environments/environments';
import { jwtDecode } from 'jwt-decode';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentComponent implements OnInit {
  documents: Document[] = [];
  error: string | null = null;
  environment = environment;
  currentUserId: number = 0;
  isLoading: boolean = true;

  constructor(
    private documentService: DocumentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUserIdFromToken();
    this.loadDocuments();
  }

  loadDocuments() {
    this.documentService
      .getDocuments()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (data) => (this.documents = data),
        error: (err) => (this.error = 'Gagal memuat data dokumen'),
      });
  }

  loadUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload: any = jwtDecode(token);
      this.currentUserId = payload.sub; // ✅ pakai sub sebagai ID
    }
  }

  confirmDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Yakin ingin menghapus dokumen ini?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteDocument(id);
      }
    });
  }

  deleteDocument(id: number) {
    this.documentService.deleteDocument(id).subscribe({
      next: () => {
        this.snackBar.open('Dokumen berhasil dihapus', 'Tutup', {
          duration: 3000,
        });
        this.loadDocuments();
      },
      error: () => {
        this.snackBar.open('Gagal menghapus dokumen', 'Tutup', {
          duration: 3000,
        });
      },
    });
  }
}
