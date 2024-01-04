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
    let trimvalue = inputTask.value.trim();
    if(trimvalue === ""){
      alert("Task can't be empty.")
      return;
    } else {
      li.innerHTML = trimvalue;
    }

    let p = document.createElement("p");

    let userdate = new Date(duetaskdate.value);
    userdate.setHours (0, 0, 0, 0);
    let currentdate = new Date();
    currentdate.setHours (0, 0, 0, 0);
    let nextthirtyday = new Date(currentdate);
    nextthirtyday.setMonth(currentdate.getMonth()+1);
    if(userdate < currentdate) {
      alert("Enter a valid date, selected date is less than current date.");
      return
    }
    else if(userdate > nextthirtyday ) {
      alert("Enter a valid date, selected date is 30 day greater than current date.")
      return
    } else {
      p.innerHTML = userdate.toDateString();
    }

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
