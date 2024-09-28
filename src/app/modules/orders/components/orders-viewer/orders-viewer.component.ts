import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';

import { DataViewModule } from 'primeng/dataview';
import { Order } from '../../../../shared/models/order.interface';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../../../shared/services/firestore.service';
import { ProductInventory } from '../../../../shared/models/product.interface';
import { CalculateSubtotal } from '../../../../shared/helpers/calculate';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { StatusEnum } from '../../../../shared/models/status.enum';

@Component({
  selector: 'app-orders-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule, DataViewModule, DividerModule, DropdownModule, ToastModule],
  templateUrl: './orders-viewer.component.html',
  styleUrl: './orders-viewer.component.scss',
  providers: [MessageService]
})
export class OrdersViewerComponent implements OnChanges {
  @Input() orders: Order[] = [];
  _firestoreService = inject(FirestoreService)
  sending = 150000;
  total = 0;

  status = [
    {
      label: 'Entregado',
      value: true
    },
    {
      label: 'No entregado',
      value: false
    }
  ]
  statusFilter = [
    {
      label: 'Entregado',
      value: true
    },
    {
      label: 'No entregado',
      value: false
    },
    {
      label: 'No filtrar',
      value: null
    },
  ]

  ordersRender: Order[] = []

  optFilter: boolean | null = null



  constructor(private _msgService: MessageService) { }

  filterStatus(value: boolean | null) {
    if (value !== null) {

      this.ordersRender = this.orders.filter(or => or.delivered === value)
    } else {
      this.ordersRender = this.orders;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orders']) {
      this.orders = changes['orders'].currentValue;
      this.getProducsts();
      this.ordersRender = this.orders;
      console.log(this.orders);
    }
  }

  getProducsts() {
    if (this.orders.length > 0) {
      this.orders.map(async (order) => {
        const ids = order.products;
        order.total = 0;
        (await this._firestoreService.getProductsByIds(ids)).subscribe(res => {
          // console.log(res);
          order.productInventory = res as ProductInventory[];
          order.total = this.sending + CalculateSubtotal(order.productInventory)
        })
      })
    }
  }

  async changeOrderStatus(idOrder: string, producsts: ProductInventory[], newStatus: boolean) {
    (await this._firestoreService.updateOrderStatus(idOrder, newStatus).then(response => {
      console.log(response);
      producsts.map(prod => (this._firestoreService.updateProductStatus(prod.id as string, StatusEnum.DELIVERED).then(resp => console.log(resp)
      )))
      this._msgService.add({ severity: 'success', detail: 'Estado cambiado satisfactoriamente' })
    }).catch(err => {
      console.log(err);
      this._msgService.add({ severity: 'error', detail: 'Error cambiando el estado de la orden' })
    }))
  }

}
