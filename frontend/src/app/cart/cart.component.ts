import { Component } from '@angular/core';

import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { cartItem } from '../cartItem.model';

@Component({
  selector: 'app-cart',
 
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
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
    if (!userId) return; // no user logged in

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

  getQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  increaseQuantity(item: cartItem): void {
    item.quantity++;
    this.updateCart(item);
  }

  decreaseQuantity(item: cartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart(item);
    }
  }

  updateCart(item: cartItem): void {
    this.cartService.updateCartItem(item).subscribe(() => {
      // optionally reload cart or recalculate totals
    });
  }
}

