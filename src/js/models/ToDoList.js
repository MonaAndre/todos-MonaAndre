import { ToDoListTask } from "./ToDoListTask";
export class ToDoList {
  list = [];
  doneList = [];
  activeTab = "allTasks";
  constructor() {}
  // saveTask sparar task genom att pusha det som kommer in i taskInput i  icke done task array "list", sparas i local storage, och visas i webbläsare
  saveTask(task) {
    console.log("saveTask");
    this.list.push(task);
    const jsonList = JSON.stringify(this.list);
    localStorage.setItem("list", jsonList);
    this.drawTasks();
  }
  // init går in i localstorage och ritar av de som finns där i webbläsarre om det finns inget visar defaulta tasks som finns i else del
  init() {
    console.log("init");
    const localList = localStorage.getItem("list");
    if (localList) {
      this.list = JSON.parse(localList);
    } else { // skapar och sparar två tasks som ska visas från början när man oppnar app
      const taskFirst = new ToDoListTask(false, "Go on a walk with the dog");
      const taskSecond = new ToDoListTask(false, "Make To Do List App")
      this.saveTask(taskFirst);
      this.saveTask(taskSecond);
    }
    // för doneList
    const doneLocalList = localStorage.getItem("doneList");
    if (doneLocalList) {
      this.doneList = JSON.parse(doneLocalList);
    }
  }
  // för att kunna uppdatera isDone (done icke done tasks status) som kopplas med checkboxes och flytta task i rätt lista
  updateStatus(status, id) {
    console.log("updateStatus");
    console.log(status, id);
    if (status == true) {
      const found = this.list.find((todo) => todo.id == id);
      found.isDone = status;
      // found.updateHtml();
      console.log("UpdateStatusFound", found);

      console.log(this.list);
    } else {
      const found = this.doneList.find((todo) => todo.id == id);
      console.log(this.doneList);
      console.log("anything", found);
      found.isDone = status;
      // found.updateHtml();
      console.log("UpdateStatusFound", found);
    }
    this.moveTask();
  }
  // method som ska uppdatera lockal storage vid ändringar
  updateLocalStorage() {
    console.log("updateLocalStorage");
    localStorage.setItem("list", JSON.stringify(this.list));
    localStorage.setItem("doneList", JSON.stringify(this.doneList));
  }
 
  moveTask() {
    console.log("moveTask");
    const listIndex = this.list.findIndex((todo) => todo.isDone == true);
    const doneListIndex = this.doneList.findIndex(
      (todo) => todo.isDone == false
    );
    console.log("listIndex", listIndex);
   //när i en  false list finns task med true 
    if ((listIndex || listIndex == 0) && listIndex !== -1) {
      const doneTask = this.list.splice(listIndex, 1)[0];
      console.log("found doneTask", doneTask);
      const prepareTask = this.updateHtml(doneTask);
      this.doneList.push(prepareTask);
     //när i en true list finns false task
    } else if ((doneListIndex || doneListIndex == 0) && doneListIndex !== -1) {
      const task = this.doneList.splice(doneListIndex, 1)[0];
      const prepareTask = this.updateHtml(task);
      this.list.push(prepareTask);
    }
    this.updateLocalStorage();
    this.drawTasks();
  }
  
  toggleActiveTab() {
    if (this.activeTab == "allTasks") {
      this.activeTab = "doneTasks";
    } else {
      this.activeTab = "allTasks";
    }
  }

  updateHtml(task) {
    if (task.isDone) {
      task.html = `
            <input 
              checked  class="to-do-app__list-checkbox"
             type="checkbox">${task.task}`;
    } else {
      task.html = `
        <input  class="to-do-app__list-checkbox"
         type="checkbox">${task.task}`;
    }
    return task;
  }
  drawTasks() {
    console.log("drawTasks");
    console.log("donelist", this.doneList);
    console.log("activTab", this.activeTab);
    const listHtml = document.querySelector(".to-do-app__list");
    if (this.activeTab == "allTasks" && this.list.length) {
      listHtml.innerHTML = "";
      for (let i = 0; i < this.list.length; i++) {
        const listItem = document.createElement("li");
        listItem.id = this.list[i].id;
        listItem.classList = "to-do-app__list-item";
        listItem.innerHTML = this.list[i].html;
        listHtml.appendChild(listItem); 

        // createHtmlForToDoList(toDoList.list[i], todolist);
      }
    } else if (this.activeTab == "doneTasks" && this.doneList.length) {
      listHtml.innerHTML = "";
      for (let i = 0; i < this.doneList.length; i++) {
        const listItem = document.createElement("li");
        listItem.id = this.doneList[i].id;
        listItem.classList = "to-do-app__list-item";
        listItem.innerHTML = this.doneList[i].html;
        console.log(this.doneList);
        listHtml.appendChild(listItem);

        // createHtmlForToDoList(doneList.list[i], todolist);
      }
    } else {
      listHtml.innerHTML = "It's empty here! Make some tasks done or add new task to do";
    }
    this.addEvents();
  }
  // att kolla efter checked/ unchecked status av checkbox(change event) och kunna göra uppdateStatus
  addEvents() {
    console.log("addEvents");
    const checkboxes = document.querySelectorAll(
      ".to-do-app__list-checkbox"
    );
    if (checkboxes && checkboxes.length) {
      console.log(checkboxes);
      checkboxes.forEach((checkbox) => {
        console.log(checkbox);
        checkbox.addEventListener("change", (e) => {
          const todoId = e.target.parentElement.id;
          this.updateStatus(e.target.checked, todoId);
        });
      });
    }
  }
}
