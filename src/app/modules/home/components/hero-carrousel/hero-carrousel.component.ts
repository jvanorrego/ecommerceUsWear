import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel'

import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FirestoreService } from '../../../../shared/services/firestore.service';
import { StatusEnum } from '../../../../shared/models/status.enum';
import { ProductInventory } from '../../../../shared/models/product.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-carrousel',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselModule, ButtonModule ],
  templateUrl: './hero-carrousel.component.html',
  styleUrl: './hero-carrousel.component.scss',
  providers: [FirestoreService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeroCarrouselComponent implements OnInit {
  products: ProductInventory[] | undefined=[];
  responsiveOptions: any[] | undefined;

  constructor(private _firestoreService: FirestoreService) { }

  async ngOnInit() {
    await (await this._firestoreService.getProductsWithLimit(5, [StatusEnum.APPROVED, StatusEnum.IN_INVENTORY])).subscribe((products) => {
      this.products = products as ProductInventory[];
      console.log(products);
      
    });
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return ''
    }
  }
}
