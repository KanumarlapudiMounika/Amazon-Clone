import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../profile-service.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email: string = '';
  updatedProfileData = {
    name: '',
    phone: '',
    address: ''
  };
  errorMessage: string = '';

  constructor(private profileService: ProfileServiceService) {}

  ngOnInit(): void {
    // Fetch email from localStorage instead of JWT
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.email = user?.email || '';
        // Optionally, pre-fill other fields
        this.updatedProfileData.name = user?.name || '';
        this.updatedProfileData.phone = user?.phone || '';
        this.updatedProfileData.address = user?.address || '';
      } catch (err) {
        console.error('Error parsing user from localStorage', err);
      }
    }
  }

  updateProfile(): void {
    if (!this.email) {
      this.errorMessage = 'Email not found!';
      return;
    }

    this.profileService.updateProfile(this.email, this.updatedProfileData)
      .subscribe({
        next: (response) => {
          alert(response?.message || 'Profile updated successfully!');
          this.errorMessage = '';
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          this.errorMessage = 'Failed to update profile.';
        }
      });
  }
}


 
