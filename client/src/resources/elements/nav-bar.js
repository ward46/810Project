import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';

@inject(Router, AuthService)
export class NavBar {
  constructor(router, auth) {
    this.authenticated = false;
    this.router = router;
    this.auth = auth;
    this.loginError = '';

  }
  login() {
    console.log("Is user being logged in????")
    return this.auth.login(this.email, this.password)
      .then(response => {
        this.userObj = response.user;
        console.log("userobj: ", this.userObj)
        sessionStorage.setItem("userObj", JSON.stringify(this.userObj));
        this.loginError = "";
        this.authenticated = this.auth.isAuthenticated();
        this.router.navigate('home');
      })
      .catch(error => {
        console.log(error);
        this.authenticated = false;
        this.loginError = "Invalid credentials.";
      });
  }

  logout() {
    this.auth.logout();
    sessionStorage.removeItem('userObj');
    this.authenticated = this.auth.isAuthenticated();

  }
  attached() {
    // document.querySelector('.navbar-nav a')[0]
    //   .on('click', function() {
    //     document.querySelector('.navbar-nav')
    //       .querySelector('li.active').classList.remove('active');

    //     console.log("this is: ", this)
    //   })
    // $('.navbar-nav a').on('click', function () {
    //   $('.navbar-nav').find('li.active').removeClass('active');
    //   $(this).parent('li').addClass('active');
    // });
  }

  bind() {
    this.authenticated = this.auth.isAuthenticated(); 
  }
}
