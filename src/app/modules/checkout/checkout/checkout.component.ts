import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/ui/navbar/navbar.component';
import { FooterComponent } from '../../../shared/ui/footer/footer.component';

import { GridContainerComponent } from '../components/grid-container/grid-container.component';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, GridContainerComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent  {

}
