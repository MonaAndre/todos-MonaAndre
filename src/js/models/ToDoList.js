export class ToDoList {

    list = [];
    doneList = [];
    constructor() {

    }
    saveTask(task) {
        this.list.push(task);
        const jsonList = JSON.stringify(this.list);

        localStorage.setItem("list", jsonList);

    }
    init() {
        const localList = localStorage.getItem("list");
        if (localList) {
            this.list = JSON.parse(localList);
        }
        const doneLocalList = localStorage.getItem("doneList");
        if (doneLocalList) {
            this.doneList = JSON.parse(doneLocalList);
        }
    }
    updateStatus(status, id) {
        console.log(status, id);
        if (status == true) {
            const found = this.list.find((todo) => todo.id == id);
            found.isDone = status;

            console.log(this.list);
        } else {
            const found = this.doneList.find((todo) => todo.id == id);
            found.isDone = status;

        }
        this.moveTask();
    }
    updateLocalStorage() {
        localStorage.setItem("list", JSON.stringify(this.list));
        localStorage.setItem("doneList", JSON.stringify(this.doneList));
    }
    moveTask() {
        const listIndex = this.list.findIndex((todo) => todo.isDone == true);
        const doneListIndex = this.doneList.findIndex((todo) => todo.isDone == false);

        if (listIndex || listIndex == 0) {
            const doneTask = this.list.slice(listIndex, 1);
            this.doneList.push(doneTask);
console.log("doneTask",doneTask);
        } else if (doneListIndex || doneListIndex == 0) {
            const task = this.doneList.slice(doneListIndex, 1);
            this.list.push(task);

        }
        this.updateLocalStorage();
        this.drawTasks();
    }
    drawTasks(activeTab) {
        const listHtml = document.querySelector(".tasksList");
        if (activeTab == "allTasks" && this.list.length) {
            listHtml.innerHTML = "";
            for (let i = 0; i < this.list.length; i++) {
                // listHtml.innerHTML=toDoList.list[i].html;
                const listItem = document.createElement("li");
                listItem.id = this.list[i].id;
                listItem.classList = "toDoApp__container--list--item";
                listItem.innerHTML = this.list[i].html;
                listHtml.appendChild(listItem);

                // createHtmlForToDoList(toDoList.list[i], todolist);
            }
        } else if (activeTab == "doneTasks" && this.doneList.length) {
            listHtml.innerHTML = "";
            for (let i = 0; i < this.doneList.length; i++) {
                const listItem = document.createElement("li");
                listItem.id = this.doneList[i].id;
                listItem.classList = "toDoApp__container--list--item";
                listItem.innerHTML = this.doneList[i].html;
                console.log(this.doneList);
                listHtml.appendChild(listItem);

                // createHtmlForToDoList(doneList.list[i], todolist);
            }
        }
    }
}