import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
 /*  email: string = '';
  password: string = '';
  message: string = '';
 msg:string=''; */

 registerForm!:FormGroup;
name='';
phone=0;
 email = ''; password = '';
 address='';
  constructor(private authService: AuthService, private router: Router,private http:HttpClient,private fb:FormBuilder) {}
  /* register() {
    this.authService.register(this.email,this.password).subscribe(response => {
          this.message = response;
          console.log("Response:",response)
          if (response === "User registered successfully!") {
            this.router.navigate(['/login']);
          }
        }, );
      } */


      /*  register() { 
          this.authService.register({ name:this.name,phone:this.phone,email: this.email, password: this.password ,address:this.address}).subscribe(
             () => this.router.navigate(['/login']), 
             error => 
              console.error('Registration failed', error) );
             } 

             selectedImage:string='';
             onImageSelected(event:any):void{
              const file=event.target.files[0];
              if(file){
                this.selectedImage=file.name;
              }
             }
             registerUser():void{
              const user={
                name:this.name,
                email:this.email,
                password:this.password,
                phone:this.phone,
                address:this.address,
                profileImage:this.selectedImage

              };
              this.http.post('http://localhost:8080/api/auth/register',user).subscribe(response=>{
                console.log("user registered:",response);
              }) */
              ngOnInit():void{
                this.registerForm=this.fb.group({
                  name:['',[Validators.required,
                    Validators.minLength(6) ]],
                  email:['',[Validators.required,
                    Validators.email]],
                    password:['',[Validators.required,
                      Validators.minLength(6),Validators.minLength(6),this.UpperCase(),
                      this.LowerCase()]],
                  phone:['',[Validators.required,
                    Validators.maxLength(10),Validators.minLength(10)
                  ]],
                address:['',[Validators.required]]})}
             UpperCase():ValidatorFn{
                  return (control:AbstractControl):ValidationErrors|null=>{
                    const hasUpper=/[A-Z]/.test(control.value);
                    return hasUpper? null :{UpperCase:true};
                  };
                }
                LowerCase():ValidatorFn{
                  return (control:AbstractControl):ValidationErrors|null=>{
                    const hasUpper=/[a-z]/.test(control.value);
                    return hasUpper? null :{LowerCase:true};
                  };
                }
              Message:string='';
             /*  onSubmit() { 
                this.authService.register({ name:this.name,phone:this.phone,email: this.email, password: this.password ,address:this.address}).subscribe(
                   () => this.Message="Registration Success",
                   error => 
                    console.error('Registration failed', error) );
                   }  */
                    /*   special():ValidatorFn{
                  return (control:AbstractControl):ValidationErrors|null=>{
                    const symbol=/[/W_]/.test(control.value);
                    return symbol? null:{special:true};
                  }
                } */

                  onSubmit() {
                    if (this.registerForm.valid) {
                      this.authService.register(this.registerForm.value)
                        .subscribe(
                          () => this.Message = "Registration Success",
                          error => console.error('Registration Failed', error)
                        );
                    }
                  }
                   
             }

