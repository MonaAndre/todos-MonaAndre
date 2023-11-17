export class ToDoListTask {

    constructor(isDone, task) {
        this.isDone = isDone;
        this.task = task;
        this.id = Date.now();
        this.html = ` 
        <input ${this.isDone ? "checked" : ""} class="toDoApp__container--list--item--checkbox"
         type="checkbox">${this.task}`;
    }

}