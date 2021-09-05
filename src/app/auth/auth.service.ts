import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData{
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean

}


@Injectable({providedIn:"root"})
export class AuthService{

    user= new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private httpClient: HttpClient, private router: Router){}

    signUp(email: string, password: string){
        return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZOYS5bGzU0at1EJavovIv17UD_Y-POpA',
        {
            'email':email,
            'password':password,
            'returnSecureToken':true
        }).pipe(catchError(this.handleError), tap(respData =>{
            this.handleAuthentication(respData.email, respData.idToken, +respData.expiresIn, respData.localId);
        }))
    }

    login(email: string, password: string){
        return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZOYS5bGzU0at1EJavovIv17UD_Y-POpA',
        {
            'email':email,
            'password':password,
            'returnSecureToken':true
        }).pipe(catchError(this.handleError), tap(respData =>{
            this.handleAuthentication(respData.email, respData.idToken, +respData.expiresIn, respData.localId);
        }))
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer= null;
    }

    handleError(errorResp: HttpErrorResponse){
        let errorMessage= 'An unknown error occurred!';
            if(!errorResp.error || !errorResp.error.error){
                return throwError(errorMessage);
            }
            switch(errorResp.error.error.message){
                case 'EMAIL_NOT_FOUND':
                  errorMessage= "This email does not exist"
                  break;
                case 'INVALID_PASSWORD':
                    errorMessage= "Invalid password"
                    break;
                case 'EMAIL_EXISTS':
                    errorMessage= "This email already exists"
                    break;  
    
            }
            return throwError(errorMessage);
    }

    private handleAuthentication(email: string, token: string, expiresIn: number, id: string){
        const user= new User(
            email,
            id,
            token,
            new Date(new Date().getTime()+ expiresIn*1000)
        );
        this.user.next(user);
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    autoLogin(){
        const userData= JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }

        const loadedUser= new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(loadedUser.token){
            this.user.next(loadedUser);
            const tokenExpirationTime= new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(tokenExpirationTime);
        }

    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer= setTimeout(()=>{
            this.logout();
        }, expirationDuration);
    }
}