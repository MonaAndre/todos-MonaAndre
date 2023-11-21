export class ToDoListTask {
    constructor(isDone, task) {
        this.isDone = isDone;
        this.task = task;
        this.id = Date.now();
        this.html = ` 
        <input class="to-do-app__list-checkbox"
         type="checkbox">${this.task}`;
    }
}
//isDone som ska visas i checkbox i webbläsare
//task text
//varje task ska få unik id med hjälp av Date.now
//html för att kunna drawTask