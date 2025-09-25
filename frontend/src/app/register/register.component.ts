import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-register',
 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  Message: string = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.UpperCase(), this.LowerCase()]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      address: ['', [Validators.required]],
      profileImage: [''] // optional, can be bound from file input
    });
  }

  UpperCase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasUpper = /[A-Z]/.test(control.value);
      return hasUpper ? null : { UpperCase: true };
    };
  }

  LowerCase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasLower = /[a-z]/.test(control.value);
      return hasLower ? null : { LowerCase: true };
    };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // Use VM backend URL inside AuthService
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.Message = "Registration Success";
          this.router.navigate(['/login']); // redirect to login after success
        },
        error: (error) => {
          console.error('Registration Failed', error);
          this.Message = "Registration Failed";
        }
      });
    } else {
      this.Message = "Please fill all required fields correctly.";
    }
  }
}

