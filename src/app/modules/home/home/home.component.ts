import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { NavbarComponent } from '../../../shared/ui/navbar/navbar.component';
import { FooterComponent } from '../../../shared/ui/footer/footer.component';
import { HeroCarrouselComponent } from '../components/hero-carrousel/hero-carrousel.component';
import { ProductsComponent } from '../components/products/products.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, HeroCarrouselComponent, ProductsComponent, FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatContainer') chatContainer!: ElementRef; // Referencia al contenedor del chat
  valueFilter: string = '';
  showModal: boolean = true;
  showButton: boolean = false;
  userInput: string = '';
  messages: { from: string; text: string }[] = [
    { from: 'bot', text: '¡Hola! ¿Cómo puedo ayudarte hoy?' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getChat();
  }

  getChat() {
    return this.http.get('http://127.0.0.1:8000/chat/startChat/').subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  changeTextFilterInput(value: string) {
    if (value !== undefined) {
      this.valueFilter = value;
    }
  }

  minimizeModal() {
    this.showModal = false;
    this.showButton = true;
  }

  toggleModal() {
    this.showModal = true;
    this.showButton = false;
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ from: 'user', text: this.userInput });
      this.getBotResponse(this.userInput);
      this.userInput = ''; // Limpiar el campo de entrada
    }
  }

  getBotResponse(userMessage: string) {
    const body = {
      "message": userMessage,
      "user_id": "6970122549"
    };
  
    return this.http.post('http://127.0.0.1:8000/chat/conversacion/', body).subscribe(
      (response: any) => {
        console.log(response);
        this.messages.push({ from: 'bot', text: response.text });
  
        if (response.products && response.products.length) {
          response.products.forEach((product: any) => {
            const productMessage = `
              <div>
                <img class="image-recomendation" src="${product.image}" alt="${product.caption}" />
                <p>${product.caption}</p>
                <p>Precio: ${product.price}</p>
                <a href="${product.url}">Ver producto</a>.
              </div>
            `;
            this.messages.push({ from: 'bot', text: productMessage });
          });
        }
  
        this.scrollToBottom(); 
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  

  private scrollToBottom() {
    const container = this.chatContainer.nativeElement;
    container.scrollTop = container.scrollHeight; // Desplazarse al final
  }

  ngAfterViewChecked() {
    this.scrollToBottom(); // Asegurarse de que se desplace hacia abajo después de que la vista se compruebe
  }
}
