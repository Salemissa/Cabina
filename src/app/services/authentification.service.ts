import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor() { }

  isAuthenticated(){
    return localStorage.getItem('login');
  }
}
