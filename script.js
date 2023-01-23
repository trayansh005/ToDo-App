let addTaskButton = document.querySelector("#btn");
let clearAllTaskButton = document.querySelector(".clear-all");
let taskInput = document.querySelector("#task-input");
let todoContainer = document.querySelector("#todo-container");
let todoHeader = document.querySelector(".todo-header");

let data = JSON.parse(localStorage.getItem("key") || "[]").map((task) => task.taskName);
data = data.map((task) => {
    return { taskName: task, status: "Pending" };
});

let closeButton = document.querySelector("#close-btn");
addTaskButton.addEventListener("click", () => toggleAddTask(true));
closeButton.addEventListener("click", () => toggleAddTask(false));

for (let i = 0; i < data.length; i++) {
    createHeader();
    createTask(data[i]);
}

taskInput.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        closeAddTask();
    }
});

function toggleAddTask(isOpen) {
    taskInput.classList.toggle("show", isOpen);
    closeButton.classList.toggle("show", isOpen);
    if (!isOpen) taskInput.value = "";
}

function closeAddTask() {
    if (taskInput.value === "") {
        console.error("Enter a task");
    } else {
        let task = {
            taskName: taskInput.value,
            status: "Pending",
        };
        data.push(task);
        localStorage.setItem("key", JSON.stringify(data));
        createHeader();
        createTask(task);
        toggleAddTask(false);
    }
}

function createHeader() {
    if (todoHeader === null) {
        console.log("Creating header...");
        todoHeader = document.createElement("div");
        todoHeader.classList.add("todo-header");
        todoHeader.innerHTML = "<h3>TASKS</h3><h3>STATUS</h3>";
        todoContainer.appendChild(todoHeader);
    } else {
        console.log("Header already exists");
    }
}

function createTask(task) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("row");
    newDiv.innerHTML = `<span class='task'>${task.taskName}</span><a class="stats-container"><span class='stats'>${task.status}</span> <img class="stats-btn" src="images/material-symbols_check-box-outline.svg"/><img class="task-close-btn" src="images/Frame 1.svg"/></a>`;
    todoContainer.appendChild(newDiv);
    let completeBtns = document.querySelectorAll(".stats-btn");
    completeBtns.forEach(function (completeBtn) {
        completeBtn.addEventListener("click", complete);
    });
    let clearTaskButtons = document.querySelectorAll(".task-close-btn");
    clearTaskButtons.forEach(function (clearTaskButton) {
        clearTaskButton.addEventListener("click", clear);
    });
}

function clear() {
    this.parentNode.parentNode.remove();
}

clearAllTaskButton.addEventListener("click", clearAll);

function clearAll() {
    data = [];
    localStorage.clear();
    while (todoContainer.firstChild) {
        todoContainer.removeChild(todoContainer.firstChild);
    }
    todoHeader = null;
}

function complete() {
    let button = this;
    let row = button.closest(".row");
    let span = row.querySelector(".stats");
    span.innerHTML = "Complete";
}
