import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';

import {DataViewModule} from 'primeng/dataview'
import { AccordionModule } from 'primeng/accordion';
import {BadgeModule} from 'primeng/badge';

import { Order } from '../../../../shared/models/order.interface';
import { FirestoreService } from '../../../../shared/services/firestore.service';
import { ProductInventory } from '../../../../shared/models/product.interface';
import { Session } from '../../../../core/models/session.model';

@Component({
  selector: 'app-order-viewer',
  standalone: true,
  imports: [CommonModule, AccordionModule,  BadgeModule,DataViewModule],
  templateUrl: './order-viewer.component.html',
  styleUrl: './order-viewer.component.scss'
})
export class OrderViewerComponent implements OnChanges, OnInit {
  
  @Input() orders!: Order[];
  @Input() session!: Session;
  _firestoreService= inject(FirestoreService)
  
  ngOnChanges(changes: SimpleChanges)  {
    if(changes['orders']){
      this.orders= changes['orders'].currentValue;
      console.log(this.orders);
      
      this.getProducsts()
    }
    if(changes['session']){
      this.session= changes['session'].currentValue;
    }
  }

  async ngOnInit() {
    console.log(this.orders);
    this.getProducsts()
  }

  getProducsts(){
    if(this.orders.length>0){
      this.orders.map(async(order)=> {
        const ids= order.products;
        (await this._firestoreService.getProductsByIds(ids)).subscribe(res=> {
          console.log(res);
          order.productInventory= res as ProductInventory[];
        })
      })
    }
  }
}
