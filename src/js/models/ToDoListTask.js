export class ToDoListTask {
    constructor(isDone, task) {
        this.isDone = isDone;
        this.task = task;
        this.id = Date.now();
        this.html = ` 
        <input class="list-item__checkbox" type="checkbox">
        <p class="list-item__text">${task}</p>
        <i class="bi bi-trash list-item__button--delete"></i>`;
    }
}
