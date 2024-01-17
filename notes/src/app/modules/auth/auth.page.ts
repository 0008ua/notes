import { Component, OnInit, inject } from '@angular/core';
import { IIsSignin } from './auth.interface';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isSignin = true;
  private authService = inject(AuthService);

  constructor() {}

  ngOnInit() {
    this.authService.echoProtected({data: 'echo test OK'}).subscribe((result) => console.log('echo result: ', result))
  }

  onIsSignin({ isSignin }: IIsSignin): void {
    this.isSignin = isSignin;
  }
}
