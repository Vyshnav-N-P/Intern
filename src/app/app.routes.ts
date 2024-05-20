import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { MatchComponent } from './Components/match/PROFILE.component';

export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path: 'login', component:LoginComponent},
    { path: 'signup', component: SignupComponent },
    {path: 'profile',component:MatchComponent}
  ];
