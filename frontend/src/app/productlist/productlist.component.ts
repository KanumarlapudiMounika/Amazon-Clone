import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  category: string = '';
  subcategory: string = '';
  searchPerformed: boolean = false;
  searchKeyword: string = '';
  selectedRating: number = 0;
  selectedSubcategory: string = '';

  isSidebarClosed = false;
  backgroundImages: string[] = [
    '/images/catagories/bg1.jpg',
    '/images/catagories/bg2.jpg',
    '/images/catagories/bg3.jpg'
  ];
  currentBackground: string = this.backgroundImages[0];
  bgIndex = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category')!;
      this.subcategory = params.get('subcategory')!;
      console.log("Navigated with:", this.category, this.subcategory);
      this.loadProducts();
    });

    setInterval(() => {
      this.bgIndex = (this.bgIndex + 1) % this.backgroundImages.length;
      this.currentBackground = this.backgroundImages[this.bgIndex];
    }, 5000);
  }

  // Load products by category & subcategory
  loadProducts(): void {
    this.productService.getProductsByCategoryAndSubcategory(this.category, this.subcategory)
      .subscribe(
        data => { this.products = data; },
        error => { console.error("API error:", error); }
      );
  }

  // Navigate to product details
  viewDetails(productName: string) {
    this.router.navigate(['/product-details', productName]);
  }

  // Search products by keyword
  onSearch(): void {
    if (!this.searchKeyword) return;
    this.productService.searchProducts(this.searchKeyword).subscribe(data => {
      this.products = data;
      this.searchPerformed = true;
    });
  }

  // Filter by rating
  onRatingChange(event: Event): void {
    const selected = parseFloat((event.target as HTMLSelectElement).value);
    if (!isNaN(selected)) {
      this.selectedRating = selected;
      this.filterByRating(selected);
    }
  }

  filterByRating(rating: number): void {
    this.productService.getProductsByRating(rating).subscribe(data => {
      this.products = data;
    });
  }

  // Filter by price & subcategory
  filterByPrice(min: number, max: number): void {
    this.productService.filterByPriceAndSubcategory(this.subcategory, min, max).subscribe(data => {
      this.products = data;
    });
  }

  // Combined filter: rating + subcategory
  applyFilters(): void {
    if (this.selectedSubcategory && this.selectedRating) {
      this.productService.filterByRatingAndSubcategory(this.selectedSubcategory, this.selectedRating)
        .subscribe(data => this.products = data);
    } else {
      this.loadProducts();
    }
  }

  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  goHome(): void { this.router.navigate(['/home']); }
  goToCart(): void { this.router.navigate(['/cart']); }
  viewOrders(): void { this.router.navigate(['/orders']); }
  updateProfile(): void { this.router.navigate(['/profile']); }
  fetchProfile(): void { this.router.navigate(['/viewProfile']); }
}

