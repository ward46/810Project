import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../resources/data/user-object';

@inject(Router, User)
export class Users {
	constructor(router, users) {
		this.router = router;
		console.log("router", router)
		this.message = 'Users';
		this.users = users;
		this.createNew = false;
	}

	newUser() {
		this.user = {
			firstName: "",
			lastName: "",
			active: true,
			role: "user",
			email: "",
			password: ""
		}
		this.createNew = true;
	}
	cancelNewUser() {
		this.createNew = false; 
	  }
	async save() {
		if (this.user && this.user.firstName && this.user.lastName
			&& this.user.email && this.user.password) {
			await this.users.saveUser(this.user);
		}
	}

	logout() {
		this.router.navigate('home');
	}

}