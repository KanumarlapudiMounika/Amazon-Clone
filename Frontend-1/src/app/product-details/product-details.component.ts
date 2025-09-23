import { Component ,Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import{MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
@Input()product! :Product;
  products: Product[] = [];
  relatedProducts:Product[]=[];
  subcategory: string = '';
constructor(private route: ActivatedRoute,private cartService:CartService,private router: Router,private authService:AuthService,private productService:ProductService,private orderService:OrderService,private snackBar:MatSnackBar){}
  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const productName = decodeURIComponent(params.get('name') || '');
      console.log(productName);
      if (productName) {
        this.productService.getProductByName(productName).subscribe({
          next: (data) => {
            if (data && data.length > 0) {
              const product = data[0];
              this.product = product;
              console.log("Product found:", product);
this.productService.getRelatedProducts(product.category, product.subcategory, product.name)
                .subscribe({
                  next: (related) => {
                    this.relatedProducts = related;
                    console.log("Related products:", related);
                  },
                  error: (err) => console.error("Error fetching related products", err)
                });
            } else {
              console.log("Product not found");
            }
          },
          error: (err) => console.error("Error fetching product", err)
        });
      }
    });
  }
  backgroundImages: string[] = [
    '/images/catagories/bg1.jpg',
  ];
  currentBackground: string = this.backgroundImages[0];
  bgIndex = 0;
   
  onInit() {
   
    this.currentBackground=this.backgroundImages[this.bgIndex];
    setInterval(() => {
      this.bgIndex = (this.bgIndex + 1) % this.backgroundImages.length;
      this.currentBackground = this.backgroundImages[this.bgIndex];
    }, 5000); // change every 5 seconds
  
  }
  filterByPrice(min:number,max:number){
    this.productService.filterByPriceAndSubcategory(this.subcategory,min,max).subscribe(data=>{
      this.products=data
    });
  }
  View(name:string){
    this.router.navigate(['/product-details',name]);
  }
  goHome(){
    this.router.navigate(['/home'])
    }  goToCart(){
    this.router.navigate(['/cart'])
    }
    addToCart() {
      const userId = this.authService.getUserId();
      if (!userId || userId === 0) {
        this.snackBar.open('User not logged in', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
        return;
      }
     
    const productId = this.product.id;
      const quantity = 1;
     
      this.cartService.addToCart(productId, quantity, userId).subscribe({
        next: () => {
          this.snackBar.open('Product added to the cart!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
        },
        error: (err) => {
          console.error('Error adding to cart:', err);
          this.snackBar.open('Failed to add the product.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      });
    }
      viewOrders(){
        this.router.navigate(['/orders']);

      }
      isSidebarClosed = false;
 
      toggleSidebar() {
        this.isSidebarClosed = !this.isSidebarClosed;
      }
      updateProfile(){
    
        this.router.navigate(['/profile'])
      }
      fetchProfile(){
        this.router.navigate(['/viewProfile'])
      }
      buyNow() {
        const userEmail = this.authService.getUserEmail();
       
        if (!userEmail) {
          this.snackBar.open('User not logged in', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
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
            this.snackBar.open('Order placed successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snackbar-success']
            });
            this.router.navigate(['/orders']);
          },
          error: (err) => {
            console.error('Order placement failed:', err);
            this.snackBar.open('Failed to place order.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snackbar-error']
            });
          }
        });
      
      }
    }
    
