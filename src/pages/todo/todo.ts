import { Component } from "@angular/core";
import { NavController, AlertController, List } from 'ionic-angular';
import { TodosProvider } from '../../providers/todos/todos';
import { TodoDetailPage } from "../todo-detail/todo-detail";
 
@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html',
})
export class TodoPage {
 
  todos: List;
 
  constructor(public navCtrl: NavController, 
              public todoService: TodosProvider, 
              public alertCtrl: AlertController) {
 
  }
 
  ionViewDidLoad(){
 
    this.todoService.getTodos().then((data) => {
      this.todos = data;
    });
 
  }
 
  createTodo(){
 
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'What do you need to do?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.createTodo({title: data.title});
          }
        }
      ]
    });
 
    prompt.present();
 
  }
 
  updateTodo(todo){
 
    let prompt = this.alertCtrl.create({
      title: 'Editar',
      message: 'Change your mind?',
      inputs: [
        {
          name: 'title', value: todo.title
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Salvar',
          handler: data => {
            this.todoService.updateTodo({
              _id: todo._id,
              _rev: todo._rev,
              title: data.title
            });
          }
        }
      ]
    });
 
    prompt.present();
  }
 
  deleteTodo(todo){
    this.todoService.deleteTodo(todo);
  }

  show(todo){
    this.navCtrl.push(TodoDetailPage, {
      todo: todo
    });
  }
 
}
