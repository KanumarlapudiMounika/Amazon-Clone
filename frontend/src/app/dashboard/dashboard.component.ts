import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-dashboard',
 
  templateUrl: './dashboard.component.html',
  styleUrls:[ './dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: Product[] = [];
  searchPerformed = false;
  searchKeyword = '';

  // Categories with images
  categories = [
    { name: "Electronics", Image: 'Electronics.jfif' },
    { name: "Fashion", Image: 'Fashion.jfif' },
    { name: "Home_Kitchen", Image: 'Home&Kitchen.jfif' },
    { name: "Books_And_Stationary", Image: 'Books&Stationary.jfif' },
    { name: "Beauty_And_Personalcare", Image: 'Beauty&Personalcare.jfif' },
    { name: "Sports_And_Fitness", Image: 'Sports&Fitness.jfif' },
    { name: "Toys_And_Baby", Image: 'BabyToys.jpg' },
    { name: "Groceries_And_Essentials", Image: 'Grocery.jfif' }
  ];

  isSidebarClosed = false;

  // Background images carousel
  backgroundImages = [
    '/images/catagories/bg1.jpg',
    '/images/catagories/bg2.jpg',
    '/images/catagories/bg3.jpg'
  ];
  currentBackground = this.backgroundImages[0];
  bgIndex = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // Rotate background images every 5 seconds
    setInterval(() => {
      this.bgIndex = (this.bgIndex + 1) % this.backgroundImages.length;
      this.currentBackground = this.backgroundImages[this.bgIndex];
    }, 5000);
  }

  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  onSearch(): void {
    if (!this.searchKeyword) return;

    this.productService.searchProducts(this.searchKeyword).subscribe(data => {
      this.searchPerformed = true;
      this.products = data;
    });
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  goToOrders(): void {
    this.router.navigate(['/orders']);
  }

  viewProduct(productName: string): void {
    this.router.navigate(['/product-details', productName]);
  }

  viewProfile(): void {
    this.router.navigate(['/viewProfile']);
  }

  updateProfile(): void {
    this.router.navigate(['/profile']);
  }
}

