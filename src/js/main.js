import "../scss/style.scss";
import { ToDoList } from "./models/ToDoList";
import { ToDoListTask } from "./models/ToDoListTask";
import "./dragula";
import drake from "./dragula";

const toDoList = new ToDoList();
toDoList.init();

// för att kunna lägga till nya tasks men isDone:false från början 
const taskInput = document.getElementById("task-input");
const btnSave = document.getElementById("save");
btnSave.addEventListener("click", function (e) {
    e.preventDefault(); // inte updatera hela sida
    // Validering att inte kunna lägga tum task eller mellanspace i input med hjälp av trim()
    if (taskInput.value.trim() === '') {
        alert("Can not add empty task");
    } else { // Remove text i taskInput efter task sparades och sätts i lista
        const newTask = new ToDoListTask(false, taskInput.value);
        toDoList.saveTask(newTask);
        taskInput.value = '';
    }
});
const btnCancel = document.getElementById("cancel");
btnCancel.addEventListener("click", function (e) {
    e.preventDefault(); // inte updatera hela sida
    taskInput.value = '';
});// Remove text i taskInput om användare trycker på cancel knapp

// användar method drawTasks för att alla tasks ska visas i webbläsare som ol-lista
toDoList.drawTasks();

// function för att kunna byta mellan done icke done tasks lista
const allTasksTrigger = document.querySelector(".to-do-app__tabs-item--all-tasks");
const doneTrigger = document.querySelector(".to-do-app__tabs-item--done-tasks");

allTasksTrigger.addEventListener("click", () => {
    toDoList.toggleActiveTab("allTasks");
    toDoList.drawTasks();
})
doneTrigger.addEventListener("click", () => {
    toDoList.toggleActiveTab("doneTasks");
    toDoList.drawTasks();
})

//  event dragent listener el händelse drake.on
drake.on("dragend", (el) => {
    // console.log(el.id);
    toDoList.updateTaskPosition(el.id); 
});


