import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class NavBar {
  constructor(router) {
	this.router = router;
          this.message = 'NavBar';
  }

//   login(){
// 	  this.router.navigate('users');
//   }
}

