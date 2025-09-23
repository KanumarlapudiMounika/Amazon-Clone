import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { cartItem } from '../cartItem.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: cartItem[] = [];
 
  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}
 
  ngOnInit(): void {
    this.loadCart();
  }
 
  loadCart(): void {
    const userId = this.authService.getUserId();
    if (!userId) return;
 
    this.cartService.getCartItems(userId).subscribe((data: cartItem[]) => {
      this.cartItems = data;
    });
  }
 
  removeItem(id: number): void {
    this.cartService.removeCartItem(id).subscribe(() => {
      this.loadCart();
    });
  }
 
  getTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );
}

getQuanity(){
  return this.cartItems.reduce((total,item)=>total+item.quantity,0);
}
increaseQuantity(item: any) {
  item.quantity++;
  this.updateCart(item);
}
 
decreaseQuantity(item: any) {
  if (item.quantity > 1) {
    item.quantity--;
    this.updateCart(item);
  }
}
 
updateCart(item: any) {
  this.cartService.updateCartItem(item).subscribe(() => {
    this.getTotal(); // recalculate total
  });
}
}