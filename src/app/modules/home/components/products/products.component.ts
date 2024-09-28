import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { ProductComponent } from '../product/product.component';

import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../../../shared/services/firestore.service';
import { ProductInventory } from '../../../../shared/models/product.interface';
import { StatusEnum } from '../../../../shared/models/status.enum';
import { SessionService } from '../../../../core/services/session.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductService, FirestoreService, SessionService]
})
export class ProductsComponent implements OnInit, OnChanges, DoCheck {
  products: ProductInventory[] | undefined;
  productsRender: ProductInventory[] | undefined;
  @Input() filterProduct:string='';

  

  session?: any;
  constructor(private _productService: FirestoreService, private _sessionService: SessionService) { }
 
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['filterProduct']&& changes['filterProduct'].currentValue !== undefined){
      this.filterProduct=changes['filterProduct'].currentValue;
      
      if(this.products!== undefined && this.filterProduct !== undefined){
        this.productsRender= this.products.filter((item)=> item.productName.toLowerCase().includes(this.filterProduct?.toLowerCase()))
      }
    }
  }

  ngDoCheck(): void {
    this.session= this._sessionService.getCurrentSession();
  }

  async ngOnInit() {
    
    (await this._productService.getProducts([StatusEnum.IN_INVENTORY, StatusEnum.APPROVED])).subscribe(response => {
      this.products = response as ProductInventory[];
      this.productsRender = this.products;
      console.log(response);
    });
  }

}
