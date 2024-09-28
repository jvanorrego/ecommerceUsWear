import { Component } from '@angular/core';

import { NavbarComponent } from '../../../shared/ui/navbar/navbar.component';
import { FooterComponent } from '../../../shared/ui/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormImagesComponent } from '../components/form-images/form-images.component';

@Component({
  selector: 'app-sell-with-us',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormImagesComponent],
  templateUrl: './sell-with-us.component.html',
  styleUrl: './sell-with-us.component.scss'
})
export class SellWithUsComponent {

}
