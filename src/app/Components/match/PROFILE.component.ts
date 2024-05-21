import { Component, NgModule} from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { NgFor, NgIf} from '@angular/common';
import { AuthServiceService } from '../../Service/auth-service.service';
import { CookieService } from 'ngx-cookie-service';
import { read } from 'fs';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-match',
  standalone: true,
  imports: [TopbarComponent,FormsModule, NgIf],
  templateUrl: './PROFILE.component.html',
  styleUrls: ['./PROFILE.component.css']
})
export class MatchComponent {
  public message = 'You are not logged in';
  public isLogged = false;
  public isEditing=false;
  username:string='';
  userid='';
  base64String:string='';
  role :string='';
  dob:any;
  image:any ;
  fileToUpload: any;

  constructor(private authService: AuthServiceService,private cookieservice: CookieService) {
    this.checkLogin();
    console.log(this.isLogged);
    
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  async checkLogin(){
    await this.authService.checkLogin();
    this.isLogged =await this.authService.isLoggedIn;
    this.message = this.isLogged ? 'You are logged in' : 'You are not logged in';
    this.role=this.cookieservice.get("Role");
    this.userid=this.cookieservice.get("id");
    this.username=this.cookieservice.get("User").toUpperCase();
   if(this.authService.isLoggedIn){
    const profile=await this.authService.profileCheck(this.userid);
    console.log(profile.profile.dob);
    this.image=profile.data;
    this.dob=profile.profile.dob;
   }

    
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
      this.base64String=reader.result as string;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  async onUpload(){
    let dob=this.formatDate(this.dob)
    console.log(dob);
    
    this.authService.editProfile(this.userid,this.base64String,dob);
  }

}