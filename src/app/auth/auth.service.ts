import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface AuthResponseData{
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string

}


@Injectable({providedIn:"root"})
export class AuthService{
    constructor(private httpClient: HttpClient){}

    signUp<AuthResponseData>(email: string, password: string){
        return this.httpClient.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZOYS5bGzU0at1EJavovIv17UD_Y-POpA',
        {
            'email':email,
            'password':password,
            'returnSecureToken':true
        }).pipe(catchError(errorResp =>{
            let errorMessage= 'An unknown error occurred!';
            if(!errorResp.error || !errorResp.error.error){
                return throwError(errorMessage);
            }
            switch(errorResp.error.error.message){
                case 'EMAIL_EXISTS':
                  errorMessage= "This email already exists"
    
            }
            return throwError(errorMessage);
        }))
    }
}