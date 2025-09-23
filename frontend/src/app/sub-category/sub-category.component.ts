import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Subcategory } from '../Subcategory.model';
import { Product } from '../product.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sub-category',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.css'
})
export class SubCategoryComponent {
  category: string = '';
  searchPerformed:boolean=false;
  products:Product[]=[];
 subcategories: { name: string, image: string }[] = [];
  //subcategories:Subcategory[]=[];
 
    allSubcategories: { [key: string]: string[] } = {
    Electronics: ['Mobiles', 'Laptops', 'TVs'],
    Fashion: ['Men', 'Women', 'Kids'],
    Grocery: ['Fruits', 'Vegetables', 'Snacks']
  }; 
  subcategoryMap: { [key: string]: { name: string, image: string }[] } = {
    Electronics: [
      { name: 'Mobiles', image: 'Mobile.jfif' },
      { name: 'Laptop', image: 'laptop.jpg' },
      { name: 'TV', image: 'tv.jfif' },
      { name: 'Smart Watches', image: 'smartwatches.jfif' }
    ],
    Fashion: [
      { name: 'Men-casual', image: 'mencasual' },
      { name: 'Women-casual', image: 'womencasuals.jpg' },
      { name: 'Women-ethnic', image: 'womenethnic.jfif' },
      { name: 'Kids', image: 'kids.jfif' },
      {name:'Men-Ethnic' ,image:'menethnice'}
    ],
    Home_Kitchen: [
      { name: 'Furniture', image: 'Furniture.jpg' },
      { name: 'Cook_Ware', image: 'cookware.jfif' },
      { name: 'Home_Decor', image: 'homedecor.jfif' },
      { name: 'Storage', image: 'storage.jpg' }
    ],
    Books_And_Stationary: [
      { name: 'Fictional_Novels', image: 'Novels' },
      { name: 'Academic', image: 'Academics.jfif' },
      { name: 'Notebooks', image: 'NoteBooks' },
      { name: 'Pens_Supplies', image: 'pens.jpg' }
    ],
    Beauty_And_Personalcare: [
      { name: 'Skin_Care', image: 'skincare.jfif' },
      { name: 'Make_Up', image: 'Makeup' },
      { name: 'Hair_Care', image: 'haircare.jfif' },
      { name: 'Fragnances', image: 'fragnance' }
    ],
    Sports_And_Fitness: [
      { name: 'Gym_Equipment', image: 'gymEquipment.jfif' },
      { name: 'Yoga_Mats', image: 'yogamats.jfif' },
      { name: 'Sports_Wear', image: 'sports.jfif' },
      { name: 'Water_Bottles', image: 'WaterBottle' }
    ],
    Toys_And_Baby: [
      { name: 'Soft_Toys', image: 'softtoys.jpg' },
      { name: 'Educational_Toys', image: 'Educationaltoys.jpg' },
      { name: 'Baby_Care', image: 'Babycare.jfif' },
      { name: 'Baby_Clothing', image: 'BabyCloths.jpg' }
    ],
    Groceries_And_Essentials: [
      { name: 'Fruits & vegetables', image: 'fruits.jfif' },
      { name: 'Snacks & Bevarages', image: 'snacks.jfif' },
      { name: 'Dairy Products', image: 'DairyProduct' },
      { name: 'Cleaning Supplies', image:'cleaning.jpg' }
    ],
  }; 
   
  constructor(private route: ActivatedRoute,private router:Router,private productService:ProductService) {}
   
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('categoryName')!;
      this.subcategories = this.subcategoryMap[this.category] || [];
    }); 

  
    }
  


  fetchProfile(){
    this.router.navigate(['/viewProfile'])
  }

  isSidebarClosed = false;
 
toggleSidebar() {
  this.isSidebarClosed = !this.isSidebarClosed;
}

updateProfile(){
    
  this.router.navigate(['/profile'])
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
  goToProductList(sub : any){
    console.log("Navigating to products",this.category,sub.name);
    this.router.navigate(['/products',this.category,sub.name]);
  }
  searchKeyword:string='';
  onSearch(){
    this.productService.searchProducts(this.searchKeyword).subscribe(data=>{
      console.log(this.searchKeyword)
      this.searchPerformed=true;
      this.products=data;
    })
  }
  View(productName:string){
    this.router.navigate(['/product-details',productName])
   }
}