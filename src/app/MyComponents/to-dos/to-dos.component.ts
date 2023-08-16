import { Component } from '@angular/core';
import { Todo } from 'src/app/Todo';
// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
// import { Component } from '@angular/core';
import {NgFor} from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.css'],
})
export class ToDosComponent {
  // todos!: string;
  todoshere!: Todo[];
  todosheredone!: Todo[];


  constructor() {
    var localItem = localStorage.getItem('todosherekey');
    var localItemdone=localStorage.getItem("todosherekeydone");
    
   
    if (localItemdone == null) {
      this.todosheredone = [];
    } else {
      this.todosheredone = JSON.parse(localItemdone);
    }
    if (localItem == null) {
      this.todoshere = [];
    } else {
      this.todoshere = JSON.parse(localItem);
    }
    setInterval(() => {
       this.checkexpiry()
      }, 50);
    // this.todoshere = [
    //   {
    //     sno: 1,
    //     title: 'This is title',
    //     desc: 'this is description',
    //     active: true,
    //   },
    //   {
    //     sno: 2,
    //     title: 'This is title2',
    //     desc: 'this is description',
    //     active: true,
    //   },
    //   {
    //     sno: 3,
    //     title: 'This is title3',
    //     desc: 'this is description',
    //     active: true,
    //   },
    // ];
  }
  //------------------------------------//
  deleteTodo(todo: Todo) {
    if (this.todoshere.includes(todo)) {
      const index = this.todoshere.indexOf(todo);
    this.todoshere.splice(index, 1);
    // console.log(todo);
    localStorage.setItem('todosherekey', JSON.stringify(this.todoshere));
    //sessionStorage.setItem("todosherekey",JSON.stringify(this.todoshere));
    } else if (this.todosheredone.includes(todo)) {
      const index = this.todosheredone.indexOf(todo);
    this.todosheredone.splice(index, 1);
    // console.log(todo);
    localStorage.setItem('todosherekeydone', JSON.stringify(this.todosheredone));
    }    
  }
//--------------------------------------------//
  addTodo(todo: Todo) {
    if (todo.title == null || todo.title == '') {
      alert('Please enter the title');
    } else if (todo.desc == null || todo.desc == '') {
      alert('Please enter the description');
    } else {
     
    // this.todoshere.push(todo);
    // this.todoshere.reverse();
    this.todoshere.unshift(todo);


      localStorage.setItem('todosherekey', JSON.stringify(this.todoshere));
      //sessionStorage.setItem("todosherekey",JSON.stringify(this.todoshere));
    }
  }
//---------------------------------------------------//
 index1!:number
  toggleTodo(todo: Todo) {
    this.toggleshow(todo);
    

    // localStorage.setItem('todosherekey', JSON.stringify(this.todoshere));
    //sessionStorage.setItem("todosherekey",JSON.stringify(this.todoshere));
    if (this.todoshere[this.index1] !== undefined && this.todoshere[this.index1] !== null){

      if(!this.todoshere[this.index1].active===false){
        this.todosheredone.unshift(this.todoshere[this.index1]);
        this.todoshere.splice(this.index1,1);
        localStorage.setItem('todosherekey', JSON.stringify(this.todoshere));
        localStorage.setItem('todosherekeydone', JSON.stringify(this.todosheredone));
      }
    }
    else if (this.todosheredone[this.index1] !== undefined && this.todosheredone[this.index1] !== null){

      if(!this.todosheredone[this.index1].active===true){
        // !this.todosheredone[this.index1].active===this.todosheredone[this.index1].active
        this.todoshere.unshift(this.todosheredone[this.index1]);
        this.todosheredone.splice(this.index1,1);
        
        localStorage.setItem('todosherekey', JSON.stringify(this.todoshere));
        localStorage.setItem('todosherekeydone', JSON.stringify(this.todosheredone));
        // this.todoshere[index].active.d
      }
    }
    }
//-----------------------------------------------------------------------------------------

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      localStorage.setItem('todosherekey', JSON.stringify(this.todoshere));
      localStorage.setItem('todosherekeydone', JSON.stringify(this.todosheredone));
      
      
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      
      this.toggleshow(event.container.data[event.currentIndex]);


      localStorage.setItem('todosherekeydone', JSON.stringify(this.todosheredone));
      localStorage.setItem('todosherekey', JSON.stringify(this.todoshere));
    }
  }
  checkexpiry(){
    var expiredTasks=this.todoshere.filter(item=>item.expiry<=Date.now())
    expiredTasks.forEach(element => {
      const ind=this.todoshere.indexOf(element)
      this.todoshere.splice(ind,1)
      element.active=true
      this.todosheredone.unshift(element)
      alert(element.title + ' TODO Expired!')
    });
  }
  toggleshow(todo:Todo){
    if(this.todoshere.includes(todo)){
      this.index1 = this.todoshere.indexOf(todo);
   this.todoshere[this.index1].active=!this.todoshere[this.index1].active;
   }else{
      this.index1 = this.todosheredone.indexOf(todo);
     this.todosheredone[this.index1].active=!this.todosheredone[this.index1].active;
   }
  }

}





/**
 *  Drag&Drop connected sorting group
 */
// export class FragdropComponent {
  

// }