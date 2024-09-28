import { ProductInventory } from "./product.interface";

export interface Order{
    idOrder?: string;
    products: string[],
    user: User  
    delivered?: boolean;
    productInventory?: ProductInventory[]
    total?: number;
}


export interface User{
    idUser: string;
    name: string;
    address: string;
    phone: string;
    neighborhood: string;
}