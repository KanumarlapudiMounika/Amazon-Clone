import { Component } from '@angular/core';
import { ProfileServiceService } from '../profile-service.service';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-view-profile',

  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
  profileData: any;

  constructor(
    private profileService: ProfileServiceService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Fetch email from authService
    const email = this.authService.getUserEmail();
    if (email) {
      this.fetchProfile(email);
    }
  }

  fetchProfile(email: string): void {
    // Call VM endpoint instead of localhost
    this.profileService.getProfile(email).subscribe(
      (data) => {
        this.profileData = data;
        console.log('Fetched profile:', data);
      },
      (error) => {
        console.error('Error fetching profile:', error);
        alert('Profile not found or server error.');
      }
    );
  }
}

