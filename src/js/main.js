import "../scss/style.scss";
import { ToDoList } from "./models/ToDoList";
import { ToDoListTask } from "./models/ToDoListTask";
import "./dragula";

const toDoList = new ToDoList();

toDoList.init();
// skapa menu items i menu list för att kunna byta listor mellan done och icke done tasks listor
const menuList = document.querySelector(".to-do-app__menu-box");
const allTasksTrigger = document.createElement("li");
allTasksTrigger.classList = "to-do-app__menu-item";
allTasksTrigger.innerHTML = "Tasks to do";
menuList.appendChild(allTasksTrigger);

const doneTrigger = document.createElement("li");
doneTrigger.classList = "to-do-app__menu-item";
doneTrigger.innerHTML = "Done Tasks";
menuList.appendChild(doneTrigger);
// för att kunna lägga till nya tasks men isDone:false från början 
const taskInput = document.getElementById("task-input");
const btnSave = document.getElementById("save");
btnSave.addEventListener("click", function () {
    // Validering att inte kunna lägga tum task
    if (taskInput.value === '') {
        alert("Cant add empty task");
    } else { // Remove text i taskInput efter task sparades och sätts i lista
        const newTask = new ToDoListTask(false, taskInput.value);
        toDoList.saveTask(newTask);
        taskInput.value = '';
    }
});
const btnCancel = document.getElementById("cancel");
btnCancel.addEventListener("click", function () {
    taskInput.value = '';
});// Remove text i taskInput om användare trycker på cancel knapp

// användar method drawTasks för att alla tasks ska visas i webbläsare som ol-lista
toDoList.drawTasks();
// function för att kunna byta mellan done icke done tasks lista
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
// om man trycker två gångar på samma menu-item lista ändras ändå ,ska ändra?


