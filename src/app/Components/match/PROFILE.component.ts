import { Component, OnInit } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { NgIf } from '@angular/common';
import { AuthServiceService } from '../../Service/auth-service.service';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [TopbarComponent, NgIf],
  templateUrl: './PROFILE.component.html',
  styleUrls: ['./PROFILE.component.css']
})
export class MatchComponent {
  public message = 'You are not logged in';
  public isLogged = false;

  constructor(private authService: AuthServiceService) {
    this.checkLogin();
  }

  async checkLogin(){
    await this.authService.checkLogin();
    this.isLogged = this.authService.isLoggedIn;
    this.message = this.isLogged ? 'You are logged in' : 'You are not logged in';
  }

  async userLogout(){
    await this.authService.logout();
    this.isLogged = this.authService.isLoggedIn;
    this.message = 'You are logged out';
  }
}
