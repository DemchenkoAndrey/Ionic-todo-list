import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  token = localStorage.getItem('token');
  url: string = 'http://localhost:9999/';

  constructor(private http: Http) {}

  get authenticated() {
    console.log(this.token !== null);
    return this.token !== null;
    }

  authenticate(username: string, password: string): Promise<void> {
    //POST /token
    const body = {
      'username': username,
      'password': password
    }
   return this.http.post(`${this.url}token`, body)
    .toPromise()
    .then(res => {
     this.token = res.json().token;
     localStorage.setItem('token', this.token);
    });
  }

  unauthenticate() {
    localStorage.removeItem('token');
  }
}