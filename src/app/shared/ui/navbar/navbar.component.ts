import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';

import { ProductToCart } from '../../models/product.interface';
import { selectProducts } from '../../../reducers/product/product.selector';
import { LayoutService } from '../../services/layout-service';
import { SessionService } from '../../../core/services/session.service';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image'
import { InputTextModule } from 'primeng/inputtext'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { MenuItem, MessageService } from 'primeng/api';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
import { DELETE_PRODUCT, RESET } from '../../../reducers/product/product.actions';
import { CalculateSubtotal } from '../../helpers/calculate';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule, InputGroupModule, InputGroupAddonModule, ButtonModule, CardModule, ImageModule, InputTextModule,  OverlayPanelModule, ToastModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [SessionService, MessageService]
})
export class NavbarComponent implements OnInit {
  items!: MenuItem[];
  keyword= '';
  @Input() needFilter: boolean| undefined;
  @Output() keywordEmitter= new EventEmitter<string>();

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;
  isLogged: boolean = false
  isCartOpen = false;

  store = inject(Store)
  // suscriptionChangesCart: Subscription;
  products: Observable<ProductToCart[]> = this.store.pipe(select(selectProducts));
  productsInCart: ProductToCart[] = []

  
  subtotal=0;

  constructor(public layoutService: LayoutService, private _router: Router, private _sessionService: SessionService, private _messageService: MessageService) {
   
  }


  keywordFilter(event: any){
    this.keywordEmitter.emit(this.keyword)
  }

  ngOnInit() {
    
    this.cartSuscription()
    let user = this._sessionService.getCurrentSession()
    console.log(user);

    if (user !== null && user !== undefined) {
      this.isLogged = true
    }
  }

  cartSuscription(){
    this.products.pipe(map(response => {
      // console.log(response);
      this.productsInCart = response
      this.subtotal= CalculateSubtotal(this.productsInCart)

    })).subscribe()
  }

  deleteFromCart(idx: number){
    this.store.dispatch(DELETE_PRODUCT({idx}))
  }

  emptyShoppingCart(){
    this.store.dispatch(RESET());
  }

  openCart() {
    this.isCartOpen = !this.isCartOpen
  }

  closeSession() {
    try {
      this._sessionService.closeSession();
      this.isLogged = false;
      this._messageService.add({ severity: "info", detail: "Sesión cerrada" });
      this._router.navigate([`/`])
    } catch (ex: any) {

      this._messageService.add({ severity: "error", detail: ex.toString() });
    }
  }
}
