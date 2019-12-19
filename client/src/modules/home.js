import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import { User } from '../resources/data/user-object';

@inject(Router, User)
export class Home {
  constructor(router, users) {
    this.router = router;
    this.message = 'Home';
    this.users = users;
    this.createNew = false;
  }

  newUser() {
    this.user = {
      firstName: "",
      lastName: "",
      active: true,
      email: "",
      password: ""
    }
    this.createNew = true;
  }

  cancelNewUser() {
    this.createNew = false; 
  }

  login() {
    this.router.navigate('users');
  }
}

