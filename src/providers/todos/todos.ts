// import { HttpClient } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from "../../services/toast-service";
import { Auth } from '../../utils/auth';

@Injectable()
export class TodosProvider {

  data: any;
  auth: any;

  constructor(private toastCtrl: ToastService) {
    // console.log('Hello TodosProvider Provider');

    this.auth = new Auth('cloudo');
    this.auth.sync();
  }

  getTodos() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
   
    return new Promise(resolve => {
      this.auth.getLocal().allDocs({
        include_docs: true
      }).then((result) => {
        this.data = [];
        result.rows.map((row) => {
          this.data.push(row.doc);
        });
        resolve(this.data);
        this.auth.getLocal().changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        }); 
      }).catch((error) => {
        console.log(error);
      }); 
    }); 
  }

  handleChange(change){
    let changedDoc = null;
    let changedIndex = null;
   
    this.data.forEach((doc, index) => {
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }
    });
   
    //Documento deletado
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    } else {
      if(changedDoc){ 
        //Documento atualizado
        this.data[changedIndex] = change.doc;
      } else { 
        console.log(change.doc);
        //Documento adicionado
        this.data.push(change.doc); 
      }
    }
  }

  createTodo(todo){
    this.auth.getLocal().post(todo);
  }
   
  updateTodo(todo){
    this.auth.getLocal().put(todo).
    then((result) => {
      this.toastCtrl.create('Atualizado com Sucesso');
    })
    .catch((err) => {
      console.log(err);
    });
  }
   
  deleteTodo(todo){
    this.auth.getLocal().remove(todo)
    .then((result) => {
      this.toastCtrl.create('Removido com Sucesso');
    }).catch((error) => {
      console.log(error);
      this.toastCtrl.create(error.message, false, 3000, 'toast-error');
    }); 
  }

}
