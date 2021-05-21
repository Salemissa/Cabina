import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule, MatDividerModule, MatCardModule,MatInputModule , MatPaginatorModule, MatIconModule, MatListModule, MatGridListModule, MatButtonModule, MatRadioModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatFormFieldModule ,MatTableModule, MatSidenav, MatSliderModule, MatSlideToggleModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from 'src/app/_helpers/LoaderInterceptor';
import { LoaderService } from 'src/app/modules/loader.service';
import { MedecinsComponent } from 'src/app/modules/medecins/medecins.component';
import { MedecinService } from 'src/app/services/medecin.service';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatTabsModule} from '@angular/material/tabs';
import { LoginComponent } from 'src/app/shared/components/login/login.component';
import { LightboxModule } from 'ngx-lightbox';







@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    MedecinsComponent,
    PostsComponent,
   
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule, 
    MatFormFieldModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatListModule,
    MatButtonModule,
    MatRadioModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatSelectModule,
    MaterialFileInputModule,
    MatNativeDateModule ,
    LightboxModule,
    MatTabsModule
    
  ],
  providers: [
    DashboardService,
    MatDatepickerModule,  
    LoaderService,
    MedecinService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  
  ]
})

export class DefaultModule { }
