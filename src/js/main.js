import "../scss/style.scss";
import { ToDoList } from "./models/ToDoList";
import { ToDoListTask } from "./models/ToDoListTask";
// import { createHtmlForToDoList } from "./models/createHtmlForToDoList";

// let toDoList;

const toDoList = new ToDoList();

toDoList.init();




// create en array wirh tasks and chechedStatus
let toDoListArray = [];
// create class ToDolistTask to create new array item
// const firstTask = new ToDoListTask(false, "To do1");
// const secondTask = new ToDoListTask(false, "To do2");
// const thirdTask = new ToDoListTask(false, "To do3");
//put all tasks in array
// toDoListArray.push(firstTask);
// toDoListArray.push(secondTask);
// toDoListArray.push(thirdTask);

let doneToDoArray = [];



//HTML structure
const container = document.getElementById("app");
container.classList = "container";

const toDoAppContainer = document.createElement("article");
toDoAppContainer.classList = "toDoApp__container";
container.appendChild(toDoAppContainer);

const menu = document.createElement("nav");
menu.classList = "toDoApp__container__menu";
toDoAppContainer.appendChild(menu);

const menuList = document.createElement("ul");
menuList.classList = "toDoApp__container__menu--box";
toDoAppContainer.appendChild(menuList);

const allTasksTrigger = document.createElement("li");
allTasksTrigger.classList = "toDoApp__container__menu__box-item";
allTasksTrigger.innerHTML = "Tasks to do";
menuList.appendChild(allTasksTrigger);

const doneTrigger = document.createElement("li");
doneTrigger.classList = "toDoApp__container__menu__box-item";
doneTrigger.innerHTML = "Done Tasks";
menuList.appendChild(doneTrigger);

// Show toDoListArray in  created HTML ordered list used loop
// const todolist = document.createElement("ol");
// todolist.classList = "toDoApp__container--list";
// toDoAppContainer.appendChild(todolist);



// const donetodolist =document.createElement("ul");
// donetodolist.classList="toDoApp__container--list";
// toDoAppContainer.appendChild(donetodolist);
// for (let i = 0; i < toDoListArray.length; i++) {
//     createHtmlForToDoList(toDoListArray[i], todolist);
// }
// for (let i = 0; i < doneToDoArray.length; i++) {
//     createHtmlForToDoList(doneToDoArray[i], donetodolist);
// }


// create newTaskContainer
const newTaskContainerHeading = document.createElement("h3");
newTaskContainerHeading.innerHTML = "Add new task:";
newTaskContainerHeading.classList = "newTask__container--heading";

const taskInput = document.createElement("input");
taskInput.type = "text";
taskInput.classList = "newTask__container--input";

const btnSave = document.createElement("button");
btnSave.innerHTML = "Save";
btnSave.classList = "btn";
btnSave.addEventListener("click", function () {
    // Remove text i taskInput
    if (taskInput.value === '') {
        alert("Cant add empty task");
    } else {
        const newTask = new ToDoListTask(false, taskInput.value);
        toDoList.saveTask(newTask);
        toDoListArray.push(newTask);// every new task push i toDoListArray

        // createHtmlForToDoList(newTask, todolist);
        taskInput.value = '';
    }
});

const btnCancel = document.createElement("button");
btnCancel.innerHTML = "Cancel";
btnCancel.classList = "btn";
btnCancel.addEventListener("click", function () {
    taskInput.value = '';// Remove text i taskInput
});
const newTaskContainer = document.createElement("div");
newTaskContainer.className = "newTask__container";
const footer = document.createElement("footer");
footer.classList = "footer";
container.appendChild(footer);
newTaskContainer.appendChild(newTaskContainerHeading);
newTaskContainer.appendChild(taskInput);
newTaskContainer.appendChild(btnCancel);
newTaskContainer.appendChild(btnSave);

footer.appendChild(newTaskContainer);


// adding the checked unchecked function för tasks

toDoList.drawTasks();
// for (let i = 0; i < toDoList.list.length; i++) {
//     createHtmlForToDoList(toDoList.list[i], todolist);
// }

allTasksTrigger.addEventListener("click", () => {
    toDoList.toggleActiveTab();
    toDoList.drawTasks();
    console.log("allTasksTrigger");
})
doneTrigger.addEventListener("click", () => {
    toDoList.toggleActiveTab();
    toDoList.drawTasks();
    console.log("doneTrigger");
})
// const doneTrigger= document.querySelector("")
// if(task.checkStatus) {



//dra li upp och ner??

// }


