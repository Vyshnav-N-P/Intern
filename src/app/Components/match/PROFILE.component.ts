import { Component} from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { NgIf} from '@angular/common';
import { AuthServiceService } from '../../Service/auth-service.service';
import { CookieService } from 'ngx-cookie-service';
import { NgModel } from '@angular/forms';
import { read } from 'fs';

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
  username:string='';
  userid='';
  role :string='';

  image:any ;
  fileToUpload: any;

  constructor(private authService: AuthServiceService,private cookieservice: CookieService) {
    this.checkLogin();
  }

  async checkLogin(){
    await this.authService.checkLogin();
    this.isLogged = this.authService.isLoggedIn;
    this.message = this.isLogged ? 'You are logged in' : 'You are not logged in';
    this.role=this.cookieservice.get("Role");
    this.userid=this.cookieservice.get("id");
    this.username=this.cookieservice.get("User").toUpperCase();
  }

  async userLogout(){
    await this.authService.logout();
    this.isLogged = this.authService.isLoggedIn;
    this.message = 'You are logged out';
  }
 
  onFileSelected(event:any) {
    this.fileToUpload = event.target.files[0];

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image = event.target.result;
    }
    reader.onloadend=()=>{
      const base64String=reader.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }


  onUpload(){

  }

  OnEdit(){
    this.authService.editProfile(this.userid,this.image);
  }
}
