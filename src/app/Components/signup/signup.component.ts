import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Service/auth-service.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public username='';
  public email='';
  public password="";
  constructor(private router:Router,private authService:AuthServiceService){}

 async userRegister(){
  this.authService.register(this.username,this.email,this.password);
}
}