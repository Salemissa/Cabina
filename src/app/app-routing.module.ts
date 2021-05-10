import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MedecinsComponent } from './modules/medecins/medecins.component';
import { PostsComponent } from './modules/posts/posts.component';
import { LoginComponent } from './shared/components/login/login.component';

const routes: Routes = [
{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }, {
    path: 'patient/:id',
    component: PostsComponent
  },
  {
    path: 'medecins',
    component: MedecinsComponent
  }],
},
  {
  path: 'login',
    component: LoginComponent
  }

    
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
