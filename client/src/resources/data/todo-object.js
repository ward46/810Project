import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';
@inject(DataServices)
export class Todo {
    constructor(data) {
        this.data = data;
        this.TODO_SERVICE = 'todos';
    }

    newTodo(user_id){
        this.selectedTodo = {};
        this.selectedTodo.userId = user_id;
        this.selectedTodo.todo = "";
        this.selectedTodo.detail = "";
        this.selectedTodo.dateDue = new Date();
        this.selectedTodo.status = "Todo";
        this.selectedTodo._id;
    }
    async saveTodo(userObj) {
        let serverResponse;
        console.log("this.selectedTodo is: ", this.selectedTodo)
        if(!this.selectedTodo.userId) {
            this.selectedTodo.userId = userObj._id;
        }
        
        if (this.selectedTodo) {
            if (this.selectedTodo._id) {
                let url = this.TODO_SERVICE + "/" + this.selectedTodo._id;
                serverResponse = await this.data.put(this.selectedTodo, url);
            } else {
                serverResponse = await this.data.post(this.selectedTodo, this.TODO_SERVICE);
            }
            return serverResponse;
        }
    }

    async deleteTodo(todo) {
        let url = this.TODO_SERVICE + "/" + todo._id;
        let serverResponse = await this.data.delete(url);
        return serverResponse
    }
    async getTodos(userid) {
        let url = this.TODO_SERVICE + '/user/' + userid; 
        let response = await this.data.get(url);
        if(!response.error) {
            this.todosArray = response; 
            console.log("THe array of todos", this.todosArray)
        }else {
            this.todosArray = []; 
            
        }
    }
}

