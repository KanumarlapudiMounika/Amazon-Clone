import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { order } from '../product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  email: string = '';
  orders: any[] = [];
  error = '';
  Orders: order[] = [];
  allOrders: order[] = [];

  constructor(private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      if (email) {
        this.email = email;
        this.fetchOrderHistory();
      }
    });
  }

  fetchOrderHistory(): void {
    this.orderService.getOrderHistory(this.email).subscribe({
      next: (data) => this.orders = data,
      error: () => this.error = 'No orders found or server error.'
    });
  }

  reorder(order: any): void {
    const reorderData = {
      email: this.email,
      amount: order.amount
    };
    this.orderService.reorder(reorderData).subscribe({
      next: () => {
        alert('Reorder successful!');
        this.fetchOrderHistory();
      },
      error: () => {
        alert('Failed to reorder.');
      }
    });
  }
}

