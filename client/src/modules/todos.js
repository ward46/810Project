import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Todo } from '../resources/data/todo-object';

@inject(Router, Todo)
export class Todos {
	constructor(router, todos) {
		this.router = router;
		this.message = 'Todos';
		this.todos = todos;
		this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
		this.statuses = ['Todo', 'In Process', 'Completed'];
		this.isCheckedCompleted = true;
		this.showForm = true;
	}

	newTodo() {
		this.todos.newTodo(this.userObj._id);
		this.showForm = true;
	}

	async saveTodo() {
		await this.todos.saveTodo()
		this.getTodos();
	}

	Cancel() {
		this.showForm = false;
	}

	async attached() {
		this.showForm = true;
		await this.getTodos();
	}

	async getTodos() {
		await this.todos.getTodos(this.userObj._id);
		// this.showForm = false;
	}

	deleteTodo() {

	}

	editTodo(todos) {
		this.todos.selectedTodo = todos;
		this.showForm = true;
	}

	updateTodo(todos) {
		this.todos.selectedTodo = todos;
		this.saveTodo();
	}


	// logout() {
	// 	this.router.navigate('home');
	// }
}