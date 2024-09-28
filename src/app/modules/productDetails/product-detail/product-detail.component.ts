import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../../shared/ui/navbar/navbar.component';
import { FooterComponent } from '../../../shared/ui/footer/footer.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FirestoreService } from '../../../shared/services/firestore.service';
import { ProductInventory, ProductToCart } from '../../../shared/models/product.interface';
import { ImageModule } from 'primeng/image';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectProducts } from '../../../reducers/product/product.selector';
import { ADD_PRODUCT } from '../../../reducers/product/product.actions';
import { SessionService } from '../../../core/services/session.service';
import { Session } from '../../../core/models/session.model';

import { ProductsFilterDisabled } from '../../../shared/helpers/item.filter';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterModule, ButtonModule,ChipModule,ImageModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  providers: [MessageService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailComponent implements OnInit {
  idProduct= ''
  product!: ProductInventory ;

  session:Session | undefined |null;

  private PHONE = '3052282432';
  private LINK: string = ``;

  
  store=inject(Store);
  
  productsCart$: Observable<ProductToCart[]> = this.store.pipe(select(selectProducts));
  productsInCart: ProductToCart[] = []
  
  constructor(private route: ActivatedRoute, private _firestoreService: FirestoreService, private _messageService: MessageService, private _sessionService: SessionService){
    route.params.subscribe(params => {
      this.idProduct=params['idProduct']
      // console.log(this.idProduct);
    })
  }

  async ngOnInit(){
    this.productsCart();
    if(this.idProduct!==""){
      (( (await this._firestoreService.getProductsById(this.idProduct)).subscribe(response=> {
        this.product=response[0]
      })))
    }

    this.session= this._sessionService.getCurrentSession()
  }

  productsCart(){
    this.productsCart$.pipe(map(response => {
      console.log(response);
      this.productsInCart = response

    })).subscribe()
  }

  openingWhatsapp() {
    if (this.product !== undefined) {
      this.LINK = `https://wa.me/${this.PHONE}?text=Hola, me gustaría saber más sobre ${this.product.productName}`
      window.open(this.LINK, `_blank`)
    }
  }

  addToCart() {

    if (this.session!== null && this.session!== undefined && this.product !== undefined) {
        // this.product.inCart=true
      this.store.dispatch(ADD_PRODUCT({item: this.product}))
      console.log(`Agregadno ${this.product.productName} a carrito`);
    }else {
      this._messageService.add({severity: `warn`, detail: `Inicia sesión antes de añadir ${this.product?.productName} al carrito`})
    }
  }

  filterDisabled(prod: ProductToCart){
    const disable=ProductsFilterDisabled(this.productsInCart, prod)
    
    return disable
  }

}
