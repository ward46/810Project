import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class Todos {
	constructor(router) {
		this.router = router;
		this.message = 'Todos';
	}

	// logout() {
	// 	this.router.navigate('home');
	// }
}