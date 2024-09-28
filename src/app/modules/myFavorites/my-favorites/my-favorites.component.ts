import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/ui/navbar/navbar.component';
import { FooterComponent } from '../../../shared/ui/footer/footer.component';

@Component({
  selector: 'app-my-favorites',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './my-favorites.component.html',
  styleUrl: './my-favorites.component.scss'
})
export class MyFavoritesComponent {

}
