import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../shared/ui/footer/footer.component';
import { NavbarComponent } from '../../../shared/ui/navbar/navbar.component';
import { AuthService } from '../../login/services/auth.service';

import { TabViewModule } from "primeng/tabview"
import { TableComponent } from '../components/table/table.component';
import { ProductInventory } from '../../../shared/models/product.interface';
import { StatusEnum } from '../../../shared/models/status.enum';
import { FirestoreService } from '../../../shared/services/firestore.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    TableComponent,
    TabViewModule

  ],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss',
  providers: [AuthService]
})
export class AdminProductsComponent implements OnInit {
  dataPending: ProductInventory[] = []

  columnsPending = [
    { field: 'image', header: 'Image' },
    { field: 'productName', header: 'Nombre Producto' },
    { field: 'category', header: 'Categoría' },
    { field: 'seller', header: 'Vendedor' },
    { field: 'phoneSeller', header: 'Teléfono' },
    { field: 'price', header: 'Precio' },
    { field: 'inventoryStatus', header: 'Estado' },
  ];
  optStatusPending = [
    StatusEnum.APPROVED, StatusEnum.PENDING, StatusEnum.REJECTED
  ]

  dataStock: ProductInventory[] = []
  columnsStock = [
    { field: 'image', header: 'Image' },
    { field: 'productName', header: 'Nombre Producto' },
    { field: 'category', header: 'Categoría' },
    { field: 'seller', header: 'Vendedor' },
    { field: 'phoneSeller', header: 'Teléfono' },
    { field: 'price', header: 'Precio' },
    { field: 'inventoryStatus', header: 'Estado' },
  ];
  optStatusStock= [
    StatusEnum.APPROVED, StatusEnum.IN_INVENTORY, StatusEnum.FOR_DELIVERY
  ]

  dataDelivery: ProductInventory[] = [];
  columnsDelivery = [
    { field: 'image', header: 'Image' },
    { field: 'productName', header: 'Nombre Producto' },
    { field: 'category', header: 'Categoría' },
    { field: 'seller', header: 'Vendedor' },
    { field: 'phoneSeller', header: 'Teléfono' },
    { field: 'price', header: 'Precio' },
    { field: 'inventoryStatus', header: 'Estado' },
  ];
  optStatusDelivery = [
    StatusEnum.PENDING, StatusEnum.DELIVERED, StatusEnum.SOLD_OUT, StatusEnum.FOR_DELIVERY
  ]

  constructor(private _authService: AuthService, private _firestoreService: FirestoreService) { }

  async ngOnInit() {
    let session = this._authService.getCurrentUser()

    if (session !== undefined && session !== null) {

    }

    this.updateProductsResponse()
  }

  async updateProductsResponse() {
    await this.getPendingProducts();
    await this.getStockProducts();
    await this.getDeliveryProducts();
  }

  async getPendingProducts() {
    (await this._firestoreService.getProducts([StatusEnum.PENDING])).subscribe(response => {
      console.log(response);
      this.dataPending = response as ProductInventory[]
    }
    )
  }

  async getStockProducts() {
    (await this._firestoreService.getProducts([StatusEnum.APPROVED, StatusEnum.IN_INVENTORY])).subscribe(response => {
      console.log(response);
      this.dataStock = response as ProductInventory[]
    }
    )
  }

  async getDeliveryProducts() {
    (await this._firestoreService.getProducts([StatusEnum.SOLD_OUT, StatusEnum.FOR_DELIVERY])).subscribe(response => {
      console.log(response);
      this.dataDelivery = response as ProductInventory[]
    }
    )
  }

  updatedItem(event: string) {
    console.log(event);
    this.updateProductsResponse()
  }
}
