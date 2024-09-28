import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {TableModule} from "primeng/table"
import { Column } from '../../../../shared/models/column.interface';
import { CommonModule } from '@angular/common';
import { ProductInventory, Status } from '../../../../shared/models/product.interface';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../../../../shared/services/firestore.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ CommonModule, FormsModule,DropdownModule,TableModule , ToastModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FirestoreService, MessageService]
})
export class TableComponent  {
  @Input() optStatus: Status[]=[]
  @Input() data!: ProductInventory[];
  @Input() cols!:Column[];
  @Input() type!:string;
  @Output() isUpdated= new EventEmitter<string>()
  
  constructor(private _firestoreService: FirestoreService, private _messageService: MessageService){}
  
  ChangeProductStatus(item: ProductInventory){
    console.log(item);
    try{
      console.log(`Changing item status ${item.id} ${item.inventoryStatus}`);
      if(item.id!== undefined && item.inventoryStatus!== undefined){
        this._firestoreService.updateProductStatus(item.id, item.inventoryStatus).then(()=>{
        this._messageService.add({severity: 'info', detail: `Item successfully updated`})
        this.isUpdated.emit(this.type)
      }).catch(ex => {
          this._messageService.add({severity: 'error', detail: `Item updating error ${ex}`})
        })
      }
      
    }catch(error){
      console.error(error)
    }
    
  }
}
