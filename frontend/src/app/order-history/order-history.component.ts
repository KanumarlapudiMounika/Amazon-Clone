import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { order } from '../product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  email:string='';
  orders: any[] = [];
  error = '';
  Orders:order[]=[];
  allOrders:order[] = []; 
 
  constructor(private orderService: OrderService,private route:ActivatedRoute) {}
  ngOnit(){
    this.route.queryParams.subscribe(params=> {
      const email=params['email'];
      if(email){
        this.email=email;
        this.fetchOrderHistory();
      }
    })
  }

  fetchOrderHistory() {
this.orderService.getOrderHistory(this.email).subscribe({
      next: (data) => this.orders = data,
      error: (err) => this.error = 'No orders found or server error.'
    });
  }
  reorder(order: any) {
    const reorderData = {
email: this.email,
      amount: order.amount
    };
    this.orderService.reorder(reorderData).subscribe({
      next: (newOrder) => {
        alert('Reorder successful!');
        this.fetchOrderHistory(); 
      },
      error: () => {
        alert('Failed to reorder.');
      }
    });
  }
}