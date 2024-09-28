import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';

import { Store, select } from '@ngrx/store';
import { selectProducts } from '../../../../reducers/product/product.selector';
import { ProductToCart } from '../../../../shared/models/product.interface';
import { map, switchMap } from 'rxjs';
import { CalculateSubtotal } from '../../../../shared/helpers/calculate';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DELETE_PRODUCT, RESET } from '../../../../reducers/product/product.actions';
import { Order } from '../../../../shared/models/order.interface';
import { SessionService } from '../../../../core/services/session.service';
import { FirestoreService } from '../../../../shared/services/firestore.service';
import { StatusEnum } from '../../../../shared/models/status.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-container',
  standalone: true,
  imports: [CommonModule,FormsModule, DividerModule, ButtonModule, InputTextModule, ToastModule],
  templateUrl: './grid-container.component.html',
  styleUrl: './grid-container.component.scss',
  providers: [MessageService]
})
export class GridContainerComponent {

  store = inject(Store);
  firestore = inject(FirestoreService);
  session = inject(SessionService);
  router = inject(Router);
  order: Order | undefined;

  phone: string = ""
  address: string = ""
  neighborhood: string = ""

  productsState$ = this.store.pipe(select(selectProducts))
  products: ProductToCart[] = []

  subtotal = 0;
  total = 0;
  sendingCost = 15000;

  constructor(private _messageService: MessageService) { }

  ngOnInit(): void {
    this.cartSuscription()
  }

  cartSuscription() {
    this.productsState$.pipe(map(response => {
      this.products = response;
      this.subtotal = CalculateSubtotal(this.products)
      if (response.length > 0) {
        this.total = this.subtotal + this.sendingCost
      }

    })).subscribe()
  }

  resetForm() {
    this.products = []
    this.phone = ''
    this.address = ''
    this.neighborhood = ''
    this.total = this.subtotal;
  }

  async handleSubmit() {
    if (this.products.length === 0) {
      this._messageService.add({ severity: 'warn', detail: `No tienes productos para poder realizar una orden` })
      return
    }
    if (this.phone.length === 0 || this.address.length === 0 || this.neighborhood.length === 0) {
      this._messageService.add({ severity: 'warn', detail: `Debes llenar todos los campos para poder realizar una orden` })
      return
    }


    const sessionUser = this.session.getCurrentSession()
    const idProducts: string[] = this.products.map(pr => pr.id as string)
    this.order = {
      products: idProducts,
      user: {
        idUser: sessionUser?.uid as string,
        name: sessionUser?.displayName as string,
        address: this.address,
        phone: this.phone,
        neighborhood: this.neighborhood
      },
      delivered: false
    };

    console.log(this.order);
    


    (await this.firestore.CreateOrder(this.order as Order).subscribe(response => {
      console.log(response.id);
      this.firestore.setOrderId(response.id).then(responseProduct => {
        console.log(responseProduct);
      })


      idProducts.map(async (prod) => await this.firestore.updateProductStatus(prod, StatusEnum.FOR_DELIVERY))
      this._messageService.add({ severity: 'success', detail: `Orden creada` })
      this.store.dispatch(RESET())
      this._messageService.add({ severity: 'info', detail: `En un momento lo redirigiremos a mis compras` })
      setTimeout(()=>{
        this.router.navigateByUrl('/my-orders')
      },2600)
    }, error => {
      this._messageService.add({ severity: 'error', detail: `Error al crear la orden` })
    }))

  }

  deleteProduct(idx: number) {
    this.store.dispatch(DELETE_PRODUCT({ idx }))
  }

}
