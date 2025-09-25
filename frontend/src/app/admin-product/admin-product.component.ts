import { Component } from '@angular/core';
import { AdminProductService } from '../admin-product.service';
import { Product } from '../product.model';
@Component({
  selector: 'app-admin-product',
 
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent {
  constructor(private adminproductService: AdminProductService) {}
  successMessage = '';
  errorMessage = '';
  product:Product[]=[];
  products: Product = {} as Product;
  updateProduct() {
    this.adminproductService.updateProduct(this.product).subscribe({
      next: (response) => {
        this.successMessage = 'Product updated successfully!';
        this.errorMessage = '';
      },
      error: (error) => {
        this.successMessage = '';
        this.errorMessage = 'Update failed. Please check product info.';
      }
    });
  }
  editMode = false;
  loadProducts(): void {
    this.adminproductService.getAllProducts().subscribe(data => this.product = data);
  }
  editProduct(product: Product): void {
    this.products = { ...product };
    this.editMode = true;
  }
  deleteProduct(id: number): void {
    this.adminproductService.deleteProduct(id).subscribe(() => this.loadProducts());
  }
  resetForm(): void {
    this.products = {} as Product;
    this.editMode = false;
  }

}
