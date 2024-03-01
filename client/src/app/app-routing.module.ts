import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { HomeComponent } from './Components/home/home.component';
import { GamepageComponent } from './Components/gamepage/gamepage.component';
import { DeveloperpageComponent } from './Components/developerpage/developerpage.component';
import { DevelopersComponent } from './Components/developers/developers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game/:id', component: GamepageComponent },
  { path: 'developers', component: DevelopersComponent },
  { path: 'developer/:id', component: DeveloperpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
