import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  password = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.username, this.password).subscribe(
      () => {
        // Redirect to login page after successful registration
        this.router.navigate(['/login']);
      },
      error => {
        // Handle error and show message
        this.errorMessage = error.error?.message || 'Registration failed';
      }
    );
  }
}
