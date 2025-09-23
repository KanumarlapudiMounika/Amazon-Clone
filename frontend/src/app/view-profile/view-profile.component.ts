import { Component } from '@angular/core';
import { ProfileServiceService } from '../profile-service.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent {
  constructor(private profileService: ProfileServiceService,private http:HttpClient,private authService:AuthService) {}
   profileData: any;
   ngOnInit(){
      const email=this.authService.getUserEmail();
      if(email){
        this.fetchProfile(email);
      }
   }
   fetchProfile(email:string):void{
    this.profileService.getProfile(email).subscribe(
      (data)=>{
        this.profileData=data;
      }
    )
   }

   }


















 /*  fetchProfile() {
    if (!this.email) {
          alert('Please enter an email');
          return;
        }
        
    this.profileService.getProfile(this.email).subscribe(
          (data) => {
            this.profileData = data; // Store profile data
          },
          (error) => {
            console.error('Error fetching profile:', error);
            alert('Profile not found or unauthorized.');
          }
        );
      } */

