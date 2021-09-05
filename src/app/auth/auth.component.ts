import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode=true;
  isLoading= false;
  error: string= null;
  authObs: Observable<AuthResponseData>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode= !this.isLoginMode;
  }

  onSubmit(authForm: NgForm){
    if(authForm.invalid){
      return;
    }
    const email= authForm.value.email;
    const password= authForm.value.password;

    this.isLoading= true;
    if(!this.isLoginMode){
      this.authObs= this.authService.signUp(email, password);
    }else{
      this.authObs= this.authService.login(email, password);
    }
    this.authObs.subscribe(
      responseData =>{
        console.log(responseData);
        this.isLoading= false;
        this.router.navigate(['/recipes'])
      },
      errorMessage=>{
        console.log(errorMessage);
        this.error= errorMessage;
        this.isLoading= false;
      }
    );

    authForm.reset();
  }

}
