import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '../../../services/document.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.css'],
})
export class CreateDocumentComponent {
  documentForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.documentForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      file: [null, Validators.required],
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.fileError = null;
      this.documentForm.patchValue({ file: file });
    } else {
      this.selectedFile = null;
      this.fileError = 'Hanya file PDF yang diperbolehkan';
      this.documentForm.get('file')?.reset();

      // Clear file input secara manual (opsional)
      if (input) input.value = '';
    }
  }

  onSubmit(): void {
    if (this.documentForm.invalid || !this.selectedFile) {
      this.snackBar.open(
        'Mohon lengkapi semua data dan unggah file PDF.',
        'Tutup',
        {
          duration: 3000,
        }
      );
      return;
    }

    const formData = new FormData();
    formData.append('title', this.documentForm.get('title')?.value);
    formData.append(
      'description',
      this.documentForm.get('description')?.value || ''
    );
    formData.append('file', this.selectedFile);

    this.documentService.createDocument(formData).subscribe({
      next: () => {
        this.snackBar.open('Dokumen berhasil diunggah', 'Tutup', {
          duration: 3000,
        });
        this.router.navigate(['/document']);
      },
      error: (err) => {
        const msg = err?.error?.message || 'Gagal mengunggah dokumen.';
        this.snackBar.open(msg, 'Tutup', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
        console.error('Upload error:', err);
      },
    });
  }
}
