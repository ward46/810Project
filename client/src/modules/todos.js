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
		this.todos.selectedTodo = {}
		// this.status;
		console.log("totods", this.todos)
		console.log("routererTODOws", this.router)
	}

	newTodo() {
		this.todos.newTodo(this.userObj._id);
		this.showForm = true;
	}

	async saveTodo() {
		console.log("sasvginhgg")
		await this.todos.saveTodo(this.userObj)
		this.showForm = false;
		this.getTodos();
	}

	cancel() {
		this.showForm = false;
	}

	async attached() {
		// this.showForm = true;
		await this.getTodos();
	}

	async getTodos() {
		await this.todos.getTodos(this.userObj._id);
		// this.showForm = false;
	}

	async deleteTodo(todo) {
		await this.todos.deleteTodo(todo)
		this.getTodos()
	}

	editTodo(todo) {
		this.todos.selectedTodo = todo;
		this.showForm = true;
	}

	updateTodo(todo) {
		this.todos.selectedTodo = todo;
		this.saveTodo();
	}


	// logout() {
	// 	this.router.navigate('home');
	// }
}