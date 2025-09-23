import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ProfileComponent } from '../profile/profile.component';
import { Router, RouterModule } from '@angular/router';
import { ViewProfileComponent } from '../view-profile/view-profile.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProfileComponent,CommonModule,FormsModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  
 products:Product[]=[];
 searchPerformed:boolean=false;
  constructor(private authService:AuthService, private fb: FormBuilder,private router: Router,private route:ActivatedRoute,private productService:ProductService) {}
  updateProfile(){
    
    this.router.navigate(['/profile'])
  }
  fetchProfile(){
    this.router.navigate(['/viewProfile'])
  }
searchKeyword:string='';

onSearch(){
  this.productService.searchProducts(this.searchKeyword).subscribe(data=>{
    console.log(this.searchKeyword)
    this.searchPerformed=true;
    this.products=data;
  })
}

  categories=[
    {name:"Electronics",Image:'Electronics.jfif' },
    {name:"Fashion",Image:'Fashion.jfif'},
    {name:"Home_Kitchen",Image:'Home&Kitchen.jfif'},
    {name:"Books_And_Stationary",Image:'Books&Stationary.jfif'},
    {name:"Beauty_And_Personalcare",Image:'Beauty&Personalcare.jfif'},
    {name:"Sports_And_Fitness",Image:'Sports&Fitness.jfif'},
    {name:"Toys_And_Baby",Image:'BabyToys.jpg'},
    {name:"Groceries_And_Essentials",Image:'Grocery.jfif'},
  ]

  isSidebarClosed = false;
 
toggleSidebar() {
  this.isSidebarClosed = !this.isSidebarClosed;
}
 
backgroundImages: string[] = [
  '/images/catagories/bg1.jpg',
  '/images/catagories/bg2.jpg',
  '/images/catagories/bg3.jpg'
];
currentBackground: string = this.backgroundImages[0];
bgIndex = 0;
 
onInit() {
 
  this.currentBackground=this.backgroundImages[this.bgIndex];
  setInterval(() => {
    this.bgIndex = (this.bgIndex + 1) % this.backgroundImages.length;
    this.currentBackground = this.backgroundImages[this.bgIndex];
  }, 5000); 

}

goHome(){
this.router.navigate(['/home'])
}
  goToCart(){
    this.router.navigate(['/cart'])
  }
  viewOrders(){

  }
  View(productName:string){
    this.router.navigate(['/product-details',productName])
   }
   goToOrders(){
    this.router.navigate(['/orders']);

   }
  }