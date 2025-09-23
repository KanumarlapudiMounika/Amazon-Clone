import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BlockuserComponent } from './admin/blockuser/blockuser.component';
import { LoadusersComponent } from './admin/loadusers/loadusers.component';
import { DeleteuserComponent } from './admin/deleteuser/deleteuser.component';
import { FilteruserComponent } from './admin/filteruser/filteruser.component';
import { UnBlockUserComponent } from './admin/un-block-user/un-block-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';


import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ProductListComponent } from './productlist/productlist.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
export const routes: Routes = [
  { path: '',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
    { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
     {path:'dashboard',component:DashboardComponent},
      { path: 'profile', component: ProfileComponent },
      { path: 'adminlogin', component:AdminLoginComponent},
      { path: 'admindashboard', component:AdminDashboardComponent},
      { path: 'adminblock', component:BlockuserComponent},
      { path: 'adminunblock', component:UnBlockUserComponent},
      { path: 'adminload', component:LoadusersComponent},
      { path: 'admindelete', component:DeleteuserComponent},
      { path: 'adminfilter', component:FilteruserComponent},
      { path: 'viewProfile', component:ViewProfileComponent },
    //  {path:'products/:category',component:ProductlistComponent},
      {path:'categories/:categoryName',component:SubCategoryComponent}, 
      { path: 'categories/:category', component: SubCategoryComponent },
     // { path: 'products/:category/:subcategory', component: ProductlistComponent },
      { path: 'products/:category/:subcategory', component:ProductListComponent },
      { path: 'dashboard', component: DashboardComponent },
     
{
  path: 'subcategory/:category',
  component: SubCategoryComponent
},
{path:'cart',component:CartComponent},
{path:'product-details/:name',component:ProductDetailsComponent},
{path:'orders',component:OrderHistoryComponent,},
    ];
    
   
    