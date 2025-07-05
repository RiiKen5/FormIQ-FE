// src/app/core/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = `https://formiq-be.onrender.com/api/auth`;
  private userSubject = new BehaviorSubject<string | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) this.userSubject.next(user);
  }

  login(email: string, password: string): Observable<any> {
    console.log(this.API_URL);
    return this.http.post(`${this.API_URL}/login`, { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, { name, email, password });
  }

getUserId(): string {
  const token = this.getToken();
  if (!token) {
    throw new Error('No token found');
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.id;
}


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['auth/login']);
  }

  setSession(token: string, user: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    this.userSubject.next(user);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
