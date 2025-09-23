 import { Component ,OnInit} from '@angular/core';
import { ProfileServiceService } from '../profile-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  email: string = '';  // Make sure email is set before sending request
  updatedProfileData = {
    name: '',
    phone: '',
    address: ''
  };
  errorMessage: string = '';
  constructor(private profileService:ProfileServiceService) {}


  ngOnInit(): void {
   
  }
 
 
 
  /* updateProfile(): void {
const profileData = { email: this.email, phoneNumber: this.phoneNumber, address: this.address };
this.profileService.updateProfile(this.email, profileData).subscribe(() => {
      alert('Profile updated successfully!');
    });
  } */

    updateProfile() {
      console.log("Update button clicked");
   
  if (!this.email) {
        this.errorMessage = 'Please enter an email.';
        console.error("No email provided");
        return;
      }
   
  console.log("Sending update request to:", `http://localhost:8080/api/profile/${this.email}`);
      console.log("Payload:", JSON.stringify(this.updatedProfileData));
   
  this.profileService.updateProfile(this.email, this.updatedProfileData).subscribe(
        response => {
          console.log("Profile updated successfully", response);
          if(response && response.message){
            alert(response.message);
          }
          else{
            alert("profile updated suceesfully");
          }
          this.errorMessage='';
        },
       
      );
    }

}
 










/* import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileServiceService } from '../profile-service.service';
import { HttpClient } from '@angular/common/http';
import { error } from 'node:console';
 
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
}) */


 