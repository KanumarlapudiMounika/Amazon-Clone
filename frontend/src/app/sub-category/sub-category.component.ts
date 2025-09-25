import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  category: string = '';
  searchPerformed: boolean = false;
  products: Product[] = [];
  subcategories: { name: string, image: string }[] = [];

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
      { name: 'Men-Ethnic', image: 'menethnice' }
    ],
    Home_Kitchen: [
      { name: 'Furniture', image: 'Furniture.jpg' },
      { name: 'Cook_Ware', image: 'cookware.jfif' },
      { name: 'Home_Decor', image: 'homedecor.jfif' },
      { name: 'Storage', image: 'storage.jpg' }
    ],
    // Add remaining subcategories if needed
  };

  isSidebarClosed = false;
  backgroundImages: string[] = [
    '/images/catagories/bg1.jpg',
    '/images/catagories/bg2.jpg',
    '/images/catagories/bg3.jpg'
  ];
  currentBackground: string = this.backgroundImages[0];
  bgIndex = 0;

  searchKeyword: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    // Load category & subcategories
    this.route.paramMap.subscribe(params => {
      this.category = params.get('categoryName')!;
      this.subcategories = this.subcategoryMap[this.category] || [];
    });

    // Background rotation
    this.currentBackground = this.backgroundImages[this.bgIndex];
    setInterval(() => {
      this.bgIndex = (this.bgIndex + 1) % this.backgroundImages.length;
      this.currentBackground = this.backgroundImages[this.bgIndex];
    }, 5000);
  }

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  fetchProfile() {
    this.router.navigate(['/viewProfile']);
  }

  updateProfile() {
    this.router.navigate(['/profile']);
  }

  goToProductList(sub: any) {
    this.router.navigate(['/products', this.category, sub.name]);
  }

  viewOrders() {
    this.router.navigate(['/orders']);
  }

  onSearch() {
    this.productService.searchProducts(this.searchKeyword).subscribe(data => {
      this.searchPerformed = true;
      this.products = data;
    });
  }

  View(productName: string) {
    this.router.navigate(['/product-details', productName]);
  }
}

