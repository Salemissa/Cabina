import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login:string;
  password:string;
  rlogin:string;
  rpassword:string;
  rcpassword:string;
 
   constructor(private snackBar:MatSnackBar,
    private router: Router){
 
   }
  ngOnInit(): void {
   
  }
   register() {
 
   }
   onlogin() {
     if(this.login=="admin" && this.password=="admin"){
       localStorage.setItem('login',"login");
        this.router.navigateByUrl('')
     }else{
       this.snackBar.open('Login invalide','',{duration:1000})
     }
   }
}
