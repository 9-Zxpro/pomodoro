// var d = new Date();
// var date = d.toISOString().slice(0,10);

const inputTask = document.getElementById("input-task");
const duetaskdate = document.getElementById("due-task-date");
const tasklist = document.getElementById("task-list");
const addtask = document.querySelector(".task-dialog button");

function addTask() {
  if (inputTask.value === "") {
    alert("please, enter a valid task");
    return;
  } else if (duetaskdate.value === "") {
    alert("please, enter a date");
    return;
  }else {
    let li = document.createElement("li");
    li.innerHTML = inputTask.value;
    let p = document.createElement("p");
    p.innerHTML = duetaskdate.value;
    li.appendChild(p);
    tasklist.appendChild(li);
    let img = document.createElement("img");
    img.src = "./img/close.svg";
    img.alt = "close-task";
    li.appendChild(img);
  }
  inputTask.value = "";
  duetaskdate.value = "";
  saveData();
}

addtask.addEventListener("click", () => {
  addTask();
});

inputTask.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
duetaskdate.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
});

tasklist.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("task-done");
      saveData();
    } else if (e.target.tagName === "IMG") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("list", tasklist.innerHTML);
}
function showTasks() {
  tasklist.innerHTML = localStorage.getItem("list");
}
showTasks();
