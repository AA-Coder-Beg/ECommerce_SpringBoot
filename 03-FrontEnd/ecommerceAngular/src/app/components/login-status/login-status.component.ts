import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {
    //Subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    );
  }

  getUserDetails() {
    if(this.isAuthenticated) {
      //Fetching the logged in user details (user's claims)
      //User Full Name is exposed as a property name
      this.oktaAuthService.getUser().then(
        (res) => {
          this.userFullName = res.name;
          const theEmail = res.email; //retrieving the email from authentication response
          this.storage.setItem('userEmail', JSON.stringify(theEmail)); //storing the email in browser storage
        }
      );
    }
  }

  logOut() {
    this.oktaAuthService.signOut(); //Terminates the Okta session and removes current tokens
  }

}
