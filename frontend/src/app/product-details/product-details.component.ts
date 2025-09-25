import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-product-details',
   templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() product!: Product;
  products: Product[] = [];
  relatedProducts: Product[] = [];
  subcategory: string = '';

  backgroundImages: string[] = ['/images/catagories/bg1.jpg'];
  currentBackground: string = this.backgroundImages[0];
  bgIndex = 0;

  isSidebarClosed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private productService: ProductService,
    private cartService: CartService,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProductFromRoute();
    this.startBackgroundRotation();
  }

  private loadProductFromRoute(): void {
    this.route.paramMap.subscribe(params => {
      const productName = decodeURIComponent(params.get('name') || '');
      if (!productName) return;

      this.productService.getProductByName(productName).subscribe({
        next: (data) => {
          if (data && data.length > 0) {
            this.product = data[0];
            this.loadRelatedProducts(this.product);
          } else {
            console.warn('Product not found');
          }
        },
        error: (err) => console.error('Error fetching product', err)
      });
    });
  }

  private loadRelatedProducts(product: Product): void {
    this.productService.getRelatedProducts(product.category, product.subcategory, product.name)
      .subscribe({
        next: (related) => this.relatedProducts = related,
        error: (err) => console.error('Error fetching related products', err)
      });
  }

  private startBackgroundRotation(): void {
    this.currentBackground = this.backgroundImages[this.bgIndex];
    setInterval(() => {
      this.bgIndex = (this.bgIndex + 1) % this.backgroundImages.length;
      this.currentBackground = this.backgroundImages[this.bgIndex];
    }, 5000);
  }

  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  viewOrders(): void {
    this.router.navigate(['/orders']);
  }

  viewProfile(): void {
    this.router.navigate(['/viewProfile']);
  }

  updateProfile(): void {
    this.router.navigate(['/profile']);
  }

  viewProduct(name: string): void {
    this.router.navigate(['/product-details', name]);
  }

  addToCart(): void {
    const userId = this.authService.getUserId();
    if (!userId || userId === 0) {
      this.showSnackBar('User not logged in', 'snackbar-error');
      return;
    }

    this.cartService.addToCart(this.product.id, 1, userId).subscribe({
      next: () => this.showSnackBar('Product added to the cart!', 'snackbar-success'),
      error: (err) => {
        console.error('Error adding to cart:', err);
        this.showSnackBar('Failed to add the product.', 'snackbar-error');
      }
    });
  }

  buyNow(): void {
    const userEmail = this.authService.getUserEmail();
    if (!userEmail) {
      this.showSnackBar('User not logged in', 'snackbar-error');
      return;
    }

    const order = {
      email: userEmail,
      amount: this.product.price,
      description: this.product.description,
      productName: this.product.name,
      paymentProvider: 'Cash on Delivery',
      transactionId: 'N/A',
      status: 'Pending'
    };

    this.orderService.placeOrder(order).subscribe({
      next: () => {
        this.showSnackBar('Order placed successfully!', 'snackbar-success');
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error('Order placement failed:', err);
        this.showSnackBar('Failed to place order.', 'snackbar-error');
      }
    });
  }

  private showSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: [panelClass]
    });
  }
}

