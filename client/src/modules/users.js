import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../resources/data/user-object';

@inject(Router)
export class Users {
	constructor(router) {
		this.router = router;
		this.message = 'Users';
		this.users = users;
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