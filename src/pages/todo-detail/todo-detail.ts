import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TodoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo-detail',
  templateUrl: 'todo-detail.html',
})
export class TodoDetailPage {

  todo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.todo = navParams.get('todo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoDetailPage');
  }

}
