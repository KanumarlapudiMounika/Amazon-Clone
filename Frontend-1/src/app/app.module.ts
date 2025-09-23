import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
 import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [LoginComponent, RegisterComponent,DashboardComponent,OrderHistoryComponent,MatSnackBar],
  imports: [BrowserModule, RouterModule,FormsModule,CommonModule,RouterModule.forRoot(routes),ReactiveFormsModule,HttpClientModule],
  exports:[RouterModule],
  providers: [{
    provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true
  }],
  bootstrap: [LoginComponent]
})
export class AppModule { }