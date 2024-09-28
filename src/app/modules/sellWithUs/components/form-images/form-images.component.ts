import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { FileSelectEvent, FileUpload, FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';
import { StorageService } from '../../../../shared/services/storage.service';
import { FirestoreService } from '../../../../shared/services/firestore.service';
import { ProductInventory } from '../../../../shared/models/product.interface';
import { StatusEnum } from '../../../../shared/models/status.enum';
import { DropdownModule } from 'primeng/dropdown';
import { Categories } from '../../../../shared/models/categorites.type';

@Component({
  selector: 'app-form-images',
  standalone: true,
  imports: [FileUploadModule, FloatLabelModule, FormsModule, InputTextModule, ReactiveFormsModule, DropdownModule, ToastModule],
  templateUrl: './form-images.component.html',
  styleUrl: './form-images.component.scss',
  providers: [MessageService, StorageService, FirestoreService]
})
export class FormImagesComponent {
  uploadedFiles: any[] = [];
  form!: FormGroup;
  progress: number | undefined;

  uploadProgress$: Observable<number> | undefined;
  downloadUrl$: Observable<string> | undefined;

  @ViewChild('fileUpload') fileUploadComponent!: FileUpload;

  categories = ['Camisetas', 'Zapatos', 'Pantalones', 'Chaquetas', 'Camisas', 'Vestidos', 'Otros']


  constructor(private _fB: FormBuilder, private _messageService: MessageService, private _storageService: StorageService, private _firestoreService: FirestoreService) {
    this.form = _fB.group({
      seller: ['', Validators.required],
      phoneSeller: ['', Validators.required],
      productName: ['', Validators.required],
      selectedCategory: [undefined, Validators.required],
      price: [null, Validators.required],
      image: [null, Validators.required]
    })
  }

  clearImage() {
    this.form.controls['image'].setValue(null)
  }

  onUpload(event: FileSelectEvent) {
    this.form.controls['image'].setValue(event.currentFiles[0]);
  }

  uploadFile(file: File) {
    return (this._storageService.pushFileToStorage(file))
  }

  async handleSubmit(value: any) {

    if (this.form.invalid) {
      this._messageService.add({ severity: 'error', detail: 'Formulario inválido' });
      return
    }
    console.log(value);
    const productToAdd: ProductInventory = {
      image: '',
      productName: this.form.controls['productName'].value,
      phoneSeller: this.form.controls['phoneSeller'].value,
      seller: this.form.controls['seller'].value,
      price: this.form.controls['price'].value,
      inventoryStatus: StatusEnum.PENDING,
      category: this.form.controls['selectedCategory'].value
    };

    this._storageService.dataToast$.subscribe(message => {
      this._messageService.add(message);
    });

    this._storageService.dataProgress$.subscribe(percent => {
      this.progress = percent
      console.log(this.progress);
    });



    const fileupload: File = this.form.controls['image'].value;

    //first upload


    (await this.uploadFile(fileupload)).subscribe(response => {
      this._storageService.dataUrl$.subscribe(url => {
        productToAdd.image = url;

        this._firestoreService.addProduct(productToAdd).subscribe((response) => {
          const productCreatedId = response['id']
          console.log(productCreatedId);
          this._firestoreService.setProductId(productCreatedId).then(responseProduct => {
            console.log(responseProduct);
          })
          this.fileUploadComponent.clear()
          this.form.reset();
          this._messageService.add({ severity: 'success', detail: `Producto creado` })
        }, error => {

          this._messageService.add({ severity: 'error', detail: `Error creando producto ${error}` })
        }
        )
      }

      )
    }, error => console.log(error)
      , () => {
      })
  }
}
