import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated= false;
  private subscription: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription =this.authService.user.subscribe(user=>{
      this.isAuthenticated= !user? false: true;
    });
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  storeData(){
    this.dataStorageService.storeRecipes();
  }

  fetchData(){
   this.dataStorageService.fetchRecipes().subscribe(); 
  }

  logout(){
    this.authService.logout();
  }

}
