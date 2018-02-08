import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../app/auth.service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username = '';
  password = '';

  constructor(private authService: AuthService,
              public navCtrl: NavController) {
  }

  login() {
    console.log('should login:', this.username);
   this.authService.authenticate(this.username, this.password)
    .then(() => this.navCtrl.setRoot(HomePage))
    .catch(err => console.warn('login failed:', err));
  }
}
