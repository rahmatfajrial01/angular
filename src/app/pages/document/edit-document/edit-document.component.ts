import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentService } from '../../../services/document.service';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css'],
})
export class EditDocumentComponent implements OnInit {
  documentForm!: FormGroup;
  documentId!: number;
  selectedFile: File | null = null;
  loading = false;
  error: string = '';
  existingFileUrl = '';
  fileError: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.documentId = +this.route.snapshot.paramMap.get('id')!;
    this.documentForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });

    this.loadDocument();
  }

  loadDocument() {
    this.loading = true;
    this.documentService.getDocumentById(this.documentId).subscribe({
      next: (doc) => {
        this.documentForm.patchValue({
          title: doc.title,
          description: doc.description,
        });
        this.existingFileUrl = doc.fileUrl;
        this.loading = false;
      },
      error: () => {
        this.error = 'Gagal memuat data dokumen';
        this.loading = false;
      },
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.fileError = '';
    } else {
      this.fileError = 'Hanya file PDF yang diperbolehkan';
      this.selectedFile = null;
    }
  }

  onSubmit() {
    if (this.documentForm.invalid) return;

    const formData = new FormData();
    formData.append('title', this.documentForm.get('title')?.value);
    formData.append(
      'description',
      this.documentForm.get('description')?.value || ''
    );
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.documentService.updateDocument(this.documentId, formData).subscribe({
      next: () => {
        this.snackBar.open('Dokumen berhasil diperbarui', 'Tutup', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
        this.router.navigate(['/document']);
      },
      error: (err) => {
        const msg = err?.error?.message || 'Terjadi kesalahan.';
        this.snackBar.open(msg, 'Tutup', {
          duration: 3000,
          panelClass: ['snackbar-error'],
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
    });
  }
}
