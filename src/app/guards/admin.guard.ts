import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (!token) {
      // Tidak ada token → redirect ke login
      return this.router.createUrlTree(['/auth/login']);
    }

    try {
      const decoded: any = jwtDecode(token);

      // ✅ Admin (role = 0) boleh lewat
      if (decoded.role === 0) {
        return true;
      }

      // ❌ Jika bukan admin → redirect ke 404
      return this.router.createUrlTree(['/404']);
    } catch (error) {
      console.error('Token tidak valid:', error);
      return this.router.createUrlTree(['/auth/login']);
    }
  }
}
