import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, ButtonModule, FloatLabelModule, InputTextModule, MessagesModule, PasswordModule, ToastModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  providers: [AuthService, MessageService]
})
export class SignUpComponent {
  auth: Auth | undefined;
  username: string = "";
  mail: string = "";
  password: string = "";

  constructor(private _authService: AuthService, private _msgService: MessageService) { }
  sigIn() {
    this._authService.signup(this.mail, this.username, this.password).pipe(switchMap(()=> {
      this._msgService.add({ severity: 'info', detail: 'Usuario creado' })
      console.log(this.auth?.currentUser);
      return of([])
    })).subscribe(response => {
      let a=this._authService.getCurrentUser()
      console.log(a);
      
    },
      error => {
        this._msgService.add({ severity: 'error', detail: error })
      },
    )
  }

}
