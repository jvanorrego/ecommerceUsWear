import { Injectable, inject } from '@angular/core';
import { Storage, UploadTask, UploadTaskSnapshot, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable, Subject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage = inject(Storage)
  private dataToast = new Subject<object>();
  dataToast$ = this.dataToast.asObservable();
  private progress = new Subject<number>();
  dataProgress$ = this.progress.asObservable();
  private url = new Subject<string>();
  dataUrl$ = this.url.asObservable();
  constructor() { }

  async pushFileToStorage(file: File) {
    //for unique names Date()
    const filePath = `product-images/${file.name + new Date()}`
    const fileRef = ref(this.storage, filePath);

    const uploadFile=await uploadBytesResumable(fileRef, file).on('state_changed', snapshot=> {
      const progress= (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      console.log(`Progres ${progress}`);
      
    }, error => {
      console.log(`Error subiendo archivo ${error}`);
      this.sendToastData({severity: 'error', detail:`Error subiendo archivo ${error}` })
      
    }, async() => {
      this.sendToastData({severity: 'info', detail:`Archivo subido exitosamente` })
      const url= await getDownloadURL(fileRef);
      // console.log(url);
      this.sendUrl(url);
      
    });

    return from([uploadFile])
  }

  sendToastData(message: object){
    this.dataToast.next(message);
  }

  sendUrl(url: string){
    this.url.next(url)
  }

  updateProgressData(progress: number){
    this.progress.next(progress);
  }
}
