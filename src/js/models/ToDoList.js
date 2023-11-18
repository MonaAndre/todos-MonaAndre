export class ToDoList {

    list = [];
    doneList = [];
    activeTab = "allTasks";
    constructor() {

    }
    saveTask(task) {
        console.log("saveTask");
        this.list.push(task);
        const jsonList = JSON.stringify(this.list);

        localStorage.setItem("list", jsonList);
        this.drawTasks();

    }
    init() {
        console.log("init");
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
            found.isDone = status;
            // found.updateHtml();
            console.log("UpdateStatusFound", found);

        }
        this.moveTask();
    }
    updateLocalStorage() {
        console.log("updateLocalStorage");
        localStorage.setItem("list", JSON.stringify(this.list));
        localStorage.setItem("doneList", JSON.stringify(this.doneList));
    }
    moveTask() {
        console.log("moveTask");
        const listIndex = this.list.findIndex((todo) => todo.isDone == true);
        const doneListIndex = this.doneList.findIndex((todo) => todo.isDone == false);
        console.log("listIndex", listIndex);
        if (listIndex || listIndex == 0) {
            const doneTask = this.list.splice(listIndex, 1)[0];
            console.log("found doneTask", doneTask);
             doneTask.updateHtml();
            this.doneList.push(doneTask);
            console.log("doneTask", doneTask);
        } else if (doneListIndex || doneListIndex == 0) {
            const task = this.doneList.splice(doneListIndex, 1)[0];
            this.list.push(task);

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

    drawTasks() {
        console.log("drawTasks");
        console.log("donelist", this.doneList);
        console.log("activTab", this.activeTab);
        const listHtml = document.querySelector(".tasksList");
        if (this.activeTab == "allTasks" && this.list.length) {
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
        } else if (this.activeTab == "doneTasks" && this.doneList.length) {
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
        } else {
            listHtml.innerHTML = "List is empty";
        }
        this.addEvents();
    }
    addEvents() {
        console.log("addEvents");
        const checkboxes = document.querySelectorAll(".toDoApp__container--list--item--checkbox");
        if (checkboxes && checkboxes.length) {
            console.log(checkboxes);
            checkboxes.forEach((checkbox) => {
                console.log(checkbox);
                checkbox.addEventListener("change", (e) => {
                    const todoId = e.target.parentElement.id;
                    this.updateStatus(e.target.checked, todoId);

                })
            })
        }
    }
}