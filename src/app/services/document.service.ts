import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

export interface Document {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
  createdAt?: string;
  createdById?: number;
  // Tambahkan field lain jika ada dari API
}

@Injectable({ providedIn: 'root' })
export class DocumentService {
  private apiUrl = 'http://localhost:3000/api/v1/document';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  getDocumentById(id: number): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createDocument(data: FormData): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}/upload`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  updateDocument(id: number, data: FormData): Observable<Document> {
    return this.http.put<Document>(`${this.apiUrl}/${id}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteDocument(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
