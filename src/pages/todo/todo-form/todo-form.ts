import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { TodosProvider } from "../../../providers/todos/todos";
import { TodoListPage } from '../todo-list/todo-list';

@IonicPage()
@Component({
  selector: 'page-todo-form',
  templateUrl: 'todo-form.html',
})
export class TodoFormPage {

  form: FormGroup;
  todo: any;

  constructor(public navCtrl: NavController, 
          public navParams: NavParams,
          private formBuilder: FormBuilder,
          private todoService: TodosProvider) {

    this.todo = navParams.get('todo');

    this.form = this.formBuilder.group({
      title: [this.todo ? this.todo.title : '', Validators.compose([
        Validators.required, 
        // Validators.pattern('[a-zA-Z]*'), 
        Validators.minLength(1), 
        Validators.maxLength(140)])
      ]

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoFormPage');
  }

  onSubmit(value: any): void { 
    console.log('Salvando...');

    if (this.form.valid) {
      console.log(value);
      if (this.todo) {

        this.todoService.updateTodo({
          _id: this.todo._id,
          _rev: this.todo._rev,
          title: value.title
        }).then((result) => {
          this.navCtrl.setRoot(TodoListPage);
        }).catch(function(error) {
          console.log(error);
        });
        
      } else {
      
        this.todoService.createTodo({title: value.title}).then((result) => {
          this.navCtrl.setRoot(TodoListPage);
        }).catch(function(error) {
          console.log(error);
        });
      }

    }
    
  }

}
