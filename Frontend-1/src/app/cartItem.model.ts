export interface cartItem{
    id:number;
    quantity:number;
    product:{
        id:number;
        name:string;
        price:number;
        imageUrl?:string;
    };
    user:{
        id:number;
        name:string;
    }
}