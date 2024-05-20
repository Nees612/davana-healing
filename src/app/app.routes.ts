import { Routes } from '@angular/router';
import { ProfileComponent } from './notus-components/views/profile/profile.component';
import { LandingComponent } from './pages/landingpage/landing-page.component';


export const routes: Routes = [{ path: 'coach', component: ProfileComponent }, {path: '', component: LandingComponent }];
