import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../../shared/ui/navbar/navbar.component';
import { FooterComponent } from '../../../shared/ui/footer/footer.component';
import { FirestoreService } from '../../../shared/services/firestore.service';
import { Order } from '../../../shared/models/order.interface';
import { OrdersViewerComponent } from '../components/orders-viewer/orders-viewer.component';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,OrdersViewerComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  firestoreService = inject(FirestoreService)
  orders: Order[] = [];

  async ngOnInit() {
    (await this.firestoreService.getOrders()).subscribe(response => {
      this.orders = response as Order[];
      console.log(this.orders);
    })
  }

}
