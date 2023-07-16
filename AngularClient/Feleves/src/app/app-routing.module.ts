import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FollowedStocksComponent } from './followed-stocks/followed-stocks.component';
import { AnnotateComponent } from './annotate/annotate.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ApiService } from './api.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [ApiService] },
  { path: 'followed-stocks', component: FollowedStocksComponent, canActivate: [ApiService] },
  { path: 'annotate', component: AnnotateComponent, canActivate: [ApiService] },
  { path: 'authorization', component: AuthorizationComponent, canActivate: [ApiService] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
