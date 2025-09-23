import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
 import { Router } from '@angular/router';
@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  category: string = '';
  subcategory: string = '';
 
  searchPerformed:boolean=false;
 
  constructor(private productService: ProductService, private route: ActivatedRoute,private router: Router) {}
 
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category')!;
      this.subcategory = params.get('subcategory')!;
      console.log("Navigated with:", this.category, this.subcategory);
 
      this.loadProducts();  // Call backend API
    });
  }
 viewDetails(productName:string){
  this.router.navigate(['/product-details',productName])
 }
  loadProducts(): void {
    this.productService.getProductsByCategoryAndSubcategory(this.category, this.subcategory)
      .subscribe(
        data => {
          console.log("Received products:", data);
        this.products = data;
        },
        error => {
          console.error("API error:", error);
        }
      );
  }
 
  /* onRatingChange(event:Event){
    const selectedRating =parseFloat( (event.target as HTMLSelectElement).value);
    this.filterByRating
  } 
  filterByRating(rating: number){
    this.selectedRating=rating;
    this.productService.getProductsByRating(rating).subscribe(data=>{
     this.products=data;
    })
   }
 */


   onRatingChange(event: Event) {
    const selectedRating = parseFloat((event.target as HTMLSelectElement).value);
    console.log('Selected Rating:', selectedRating);
    if (!isNaN(selectedRating)) {
      this.filterByRating(selectedRating);
    }
  }
   
  filterByRating(rating: number) {
    this.selectedRating = rating;
    this.productService.getProductsByRating(rating).subscribe(data => {
      this.products = data;
      console.log('Filtered products:', this.products);
    });
  }






  goHome(){
    this.router.navigate(['/home'])
    }
      goToCart(){
        this.router.navigate(['/cart'])
      }
      viewOrders(){
    
      }
      updateProfile(){
    
        this.router.navigate(['/profile'])
      }
      fetchProfile(){
        this.router.navigate(['/viewProfile'])
      }




    filterByPrice(min:number,max:number){
      this.productService.filterByPriceAndSubcategory(this.subcategory,min,max).subscribe(data=>{
        this.products=data
      });
    }


selectedRating:number=0;
onRating(){
  this.productService.getProductsByRating(this.selectedRating).subscribe(data=>{
    this.products=data;
  })

}



    applyFilters(): void {
      if (this.selectedSubcategory && this.selectedRating !== null) {
        this.productService
          .filterByRatingAndSubcategory(this.selectedSubcategory, this.selectedRating)
          .subscribe((data) => {
            this.products = data;
          });
      } else {
        this.loadProducts(); // fallback to all products
      }
    }
   
   





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
     
 
  
  /* getAllProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }
 
  filterProducts(): void {
    if (this.selectedSubcategory && this.selectedRating > 0) {
      this.productService
        .filterByRatingAndSubcategory(this.selectedSubcategory, this.selectedRating)
        .subscribe((data) => {
          this.products = data;
        });
    }
  } */



    selectedSubcategory: string = '';
   


    

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