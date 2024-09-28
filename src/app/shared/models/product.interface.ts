import { Categories } from "./categorites.type";

interface Product{
    id?: string;
    image: string
	productName: string
	price: number
}

export interface ProductInventory extends Product{
    seller: string
    phoneSeller: string
    inventoryStatus?: Status
    category?: Categories;
}


export interface ProductToCart extends ProductInventory{
    inCart?:boolean;
}

export type Status= 'In Inventory'|'Sold Out' |'Pending'| 'Delivered' | 'Approved' | 'Rejected' | 'For Delivery';