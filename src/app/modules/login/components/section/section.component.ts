import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';

import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [ CommonModule,FormsModule,FormComponent, InputSwitchModule, SignUpComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  isLogin: boolean=true;

  handleLogin(value:boolean){
    this.isLogin=value;
  }
}
