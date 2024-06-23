import { Routes } from '@angular/router';
import { ProfileComponent } from "./pages/profile/profile.component";
import { LandingComponent } from './pages/landingpage/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


export const routes: Routes = [
    {path: '', component: LandingComponent },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'coach/:coachID', component: ProfileComponent },
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '**', redirectTo: '/', pathMatch: 'full'}
];
