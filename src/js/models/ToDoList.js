import { ToDoListTask } from "./ToDoListTask";
import "../dragula";
export class ToDoList {
  // sätter # innan variable namn för att göra en variabel privat som ska inte synnas utanför class i utterliggande kod
  #list = [];
  #doneList = [];
  #activeTab = "allTasks";
  // constructor() { } behövs inte skriva  för att construktor finns reda från början i class
  // saveTask sparar task  genom att pusha det som kommer in i taskInput i  icke done task array "list", sparas i local storage, och visas i webbläsare
  saveTask(task) {
    // console.log("saveTask");
    this.#list.push(task);
    this.updateLocalStorage();
    this.drawTasks();
  }
  
  // init går in i localstorage och ritar av de som finns där i webbläsarre om det finns inget visar defaulta tasks som finns i else del
  init() {
    // console.log("init");
    const localList = localStorage.getItem("list");
    if (localList) {
      this.#list = JSON.parse(localList);
    } else { // skapar och sparar två tasks som ska visas från början när man oppnar app
      const taskFirst = new ToDoListTask(false, "Go on a walk with the dog");
      const taskSecond = new ToDoListTask(false, "Make To Do List App");
      // console.log(taskFirst.task);
      // console.log(this.#list);
      // console.log(this.#doneList);
      // console.log(this.#activeTab);
      this.saveTask(taskFirst);
      this.saveTask(taskSecond);
    }
    // för doneList
    const doneLocalList = localStorage.getItem("doneList");
    if (doneLocalList) {
      this.#doneList = JSON.parse(doneLocalList);
    }
  }

  // för att kunna uppdatera isDone (done icke done tasks status) som kopplas med checkboxes och flytta task i rätt lista
  updateStatus(status, id) {
    // console.log("updateStatus");
    // console.log(status, id);
    if (status) {
      // debugger
      const found = this.#list.find((todo) => todo.id == id);
      found.isDone = status;
      // found.updateHtml();
    } else {
      const found = this.#doneList.find((todo) => todo.id == id);
      found.isDone = status;
      // found.updateHtml();
    }
    this.moveTask();
  }
  // method som ska uppdatera lockal storage vid ändringar
  updateLocalStorage() {
    // console.log("updateLocalStorage");
    localStorage.setItem("list", JSON.stringify(this.#list));
    localStorage.setItem("doneList", JSON.stringify(this.#doneList));
  }

  moveTask() {
    // console.log("moveTask");
    const listIndex = this.#list.findIndex((todo) => todo.isDone == true);
    const doneListIndex = this.#doneList.findIndex(
      (todo) => todo.isDone == false
    );
    //findIndex return -1 om ingen element i array har uppfult villkor övanför
    //när i en  false list finns task med true 
    if ((listIndex || listIndex == 0) && listIndex !== -1) {
      const doneTask = this.#list.splice(listIndex, 1)[0]; //splice retur en ny array och därför måste man ta det som står på index 0 och få bara object utan extra array
      const prepareTask = this.updateHtml(doneTask);
      this.#doneList.push(prepareTask);
      //när i en true list finns false task
    } else if ((doneListIndex || doneListIndex == 0) && doneListIndex !== -1) {
      const task = this.#doneList.splice(doneListIndex, 1)[0];
      const prepareTask = this.updateHtml(task);
      this.#list.push(prepareTask);
    }
    this.updateLocalStorage();
    this.drawTasks();
  }
  // om man trycker två gångar på samma menu-item lista ändras ändå ,ska ändra? extra if för att dubbelkolla om man har redan tryckt på en activ tab 
  toggleActiveTab(newActiveTab) {
    if (newActiveTab == this.#activeTab) return;
    this.#activeTab = newActiveTab;
  }

  //uppdatera html hos en ändrat task. Ändrar bara checked eller inte checked
  updateHtml(task) {
    if (task.isDone) {
      task.html = `
     <input checked class="list-item__checkbox" type="checkbox">
     <p class="list-item__text">${task.task}</p>
     <i class="bi bi-trash list-item__button--delete"></i>`;
    } else {
      task.html = `
     <input class="list-item__checkbox" type="checkbox">
     <p class="list-item__text">${task.task}</p>
     <i class="bi bi-trash list-item__button--delete"></i>`;
    }
    return task;
  }

  drawTasks() {
    // console.log("drawTasks");
    // console.log("donelist", this.#doneList);
    // console.log("activTab", this.#activeTab);
    const listHtml = document.querySelector(".to-do-app__list"); // ritar av html varje gång baserat på array
    if (this.#activeTab == "allTasks" && this.#list.length) {
      listHtml.innerHTML = "";
      for (let i = 0; i < this.#list.length; i++) {
        const listItem = document.createElement("li");
        listItem.id = this.#list[i].id;
        listItem.classList.add("list-item", "to-do-app__list-item");
        listItem.innerHTML = this.#list[i].html;
        listHtml.appendChild(listItem);
      }
    } else if (this.#activeTab == "doneTasks" && this.#doneList.length) {
      listHtml.innerHTML = "";
      for (let i = 0; i < this.#doneList.length; i++) {
        const listItem = document.createElement("li");
        listItem.id = this.#doneList[i].id;
        listItem.classList.add("list-item", "to-do-app__list-item");
        listItem.innerHTML = this.#doneList[i].html;
        listHtml.appendChild(listItem);
      }
    } else {
      listHtml.innerHTML = "It's empty here! Make some tasks done or add new task to do";
    }
    this.addEvents();
  }

  // att kolla efter checked/ unchecked status av checkbox(change event) och kunna göra uppdateStatus
  addEvents() {
    // console.log("addEvents");
    const checkboxes = document.querySelectorAll(
      ".list-item__checkbox"
    );
    if (checkboxes && checkboxes.length) {
      // console.log(checkboxes);
      checkboxes.forEach((checkbox) => { //e.target blir själva checkbox
        checkbox.addEventListener("change", (e) => {
          const todoId = e.target.parentElement.id;
          this.updateStatus(e.target.checked, todoId);

        });
      });
    }
    const deleteBtns = document.querySelectorAll(
      ".list-item__button--delete"
    );
    if (deleteBtns && deleteBtns.length) {
      deleteBtns.forEach((deleteBtn) => { //e.target blir själva checkbox
        deleteBtn.addEventListener("click", (e) => {
          console.log("pushed btn");
          const todoId = e.target.parentElement.id;
          this.removeTodoById(todoId)
        });
      });
    }
  }

  // on cklick på trash icon en to do kan  man ta bort den från lista (splice från array)
  removeTodoById(todoId) {
    const removeToDoFromList = this.#list.findIndex((todo) => todo.id == todoId);
    const removeToDoFromDoneList = this.#doneList.findIndex(
      (todo) => todo.id == todoId
    );
    if ((removeToDoFromList || removeToDoFromList == 0) && removeToDoFromList !== -1) {
      this.#list.splice(removeToDoFromList, 1); //splice retur en ny array och därför måste man ta det som står på index 0 och få bara object som står på 0-index utan extra array

      //när i en true list finns false task
    } else if ((removeToDoFromDoneList || removeToDoFromDoneList == 0) && removeToDoFromDoneList !== -1) {
      this.#doneList.splice(removeToDoFromDoneList, 1);
    }
    this.updateLocalStorage();
    this.drawTasks();
  }

  // method som ska spara nu läget för task efter man flyttat på den i webbrowser
  updateTaskPosition(taskId) {
    // console.log("updateTaskPosition func");
    const allTasks = document.querySelectorAll(".to-do-app__list-item");
    let taskMoveIndex;
    allTasks.forEach((task, taskIndex) => {
      if (task.id === taskId) {
        taskMoveIndex = taskIndex;
        return
      }
    });
    const taskMoveInList = this.#list.find((task) => task.id == taskId);
    const doneTaskMoveInList = this.#doneList.find((doneTask) => doneTask.id == taskId);
    if (taskMoveInList) { // går in här om task som flyttades va i list
      const taskIndexMoveInList = this.#list.findIndex(
        (task) => task.id == taskId
      );
      this.#list.splice(taskIndexMoveInList, 1);
      this.#list.splice(taskMoveIndex, 0, taskMoveInList);
      this.updateLocalStorage();
    } else if (doneTaskMoveInList) { // elsee om taske flyttades i doneList (doneTask)
      const doneTaskIndexMoveInList = this.#doneList.findIndex(
        (doneTask) => doneTask.id == taskId
      );
      this.#doneList.splice(doneTaskIndexMoveInList, 1);
      this.#doneList.splice(taskMoveIndex, 0, doneTaskMoveInList);
      this.updateLocalStorage();
    }
  }
}
