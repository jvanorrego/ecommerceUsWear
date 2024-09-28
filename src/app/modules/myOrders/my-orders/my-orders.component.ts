import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../../shared/ui/navbar/navbar.component';
import { FooterComponent } from '../../../shared/ui/footer/footer.component';
import { FirestoreService } from '../../../shared/services/firestore.service';
import { SessionService } from '../../../core/services/session.service';
import { OrderViewerComponent } from '../components/order-viewer/order-viewer.component';
import { Order } from '../../../shared/models/order.interface';
import { ProductInventory } from '../../../shared/models/product.interface';
import { Session } from '../../../core/models/session.model';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, OrderViewerComponent],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit {
  
  _firestoreService= inject(FirestoreService)
  _sessionService= inject(SessionService)
  ordersUser: Order[]=[]
  session!: Session
  products: ProductInventory[]=[]
  
  async ngOnInit() {
    this.session=this._sessionService.getCurrentSession() as Session;
    (await this._firestoreService.getOrderByUser(this.session.uid as string)).subscribe(response=> {
      this.ordersUser=response as Order[]
    });
  }


}
