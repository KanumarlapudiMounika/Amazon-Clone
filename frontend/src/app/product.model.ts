import { Data } from "@angular/router";

export interface Product{
    id:number;
    name:string;
    description:string;
    price:number;
    rating:number;
    category:string;
    imageUrl:string;
    stockQuantity:number;
    subcategory:string;
}
export interface order{
    orderId:number;
    amount:number;
    status:string;
    createdAt:Date;
    product:Product;
    description:string;
    productName:string;
}