import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoFormPage } from './todo-form';

@NgModule({
  declarations: [
    TodoFormPage,
  ],
  imports: [
    IonicPageModule.forChild(TodoFormPage),
  ],
})
export class TodoFormPageModule {}
