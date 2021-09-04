import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode=true;
  isLoading= false;
  error: string= null;

  constructor(private authService: AuthService) { }

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
      this.authService.signUp(email, password).subscribe(
        responseData =>{
          console.log(responseData);
          this.isLoading= false;
        },
        errorMessage=>{
          console.log(errorMessage);
          this.error= errorMessage;
          this.isLoading= false;
        }
      );
    }

    authForm.reset();
  }

}
