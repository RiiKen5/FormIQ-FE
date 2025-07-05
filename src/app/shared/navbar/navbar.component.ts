import { Component } from '@angular/core';
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
imgPath = 'assets/images/no-data.svg';
logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'auth/login';
}
}
