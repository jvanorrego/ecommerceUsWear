import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { chatStart } from '../interfaces/chatStart';

@Injectable({
  providedIn: 'root'
})
export class StartChatService {

  constructor(private httpClient: HttpClient) { }

  private URL = 'http://127.0.0.1:8000/chat/startChat';

  getChatStart(){
    return this.httpClient.get<chatStart>(this.URL);
}
}