// var d = new Date();
// var date = d.toISOString().slice(0,10);

const inputTask = document.getElementById("input-task");
const duetaskdate = document.getElementById("due-task-date");
const addtask = document.querySelector(".task-dialog button");
const tasklist = document.querySelector(".today-text-bar ul");

function addTask() {
  if (inputTask.value === "") {
    alert("please, enter a valid task");
    return;
  } else if (duetaskdate.value === "") {
    alert("please, enter a date");
    return;
  } else {
    let li = document.createElement("li");
    let trimvalue = inputTask.value.trim();
    if (trimvalue === "") {
      alert("Task can't be empty.");
      return;
    } else {
      li.innerHTML = trimvalue;
    }

    let p = document.createElement("p");

    let userdate = new Date(duetaskdate.value);
    userdate.setHours(0, 0, 0, 0);
    let currentdate = new Date();
    currentdate.setHours(0, 0, 0, 0);
    let nextthirtyday = new Date(currentdate);
    nextthirtyday.setMonth(currentdate.getMonth() + 1);
    if (userdate < currentdate) {
      alert("Enter a valid date, selected date is less than current date.");
      return;
    } else if (userdate > nextthirtyday) {
      alert(
        "Enter a valid date, selected date is 30 day greater than current date."
      );
      return;
    } else {
        listMaker();
        tasklist.appendChild(li);
        saveDataToday();
      
    }

    function listMaker() {
      p.innerHTML = userdate.toDateString();
      li.appendChild(p);
      let div = document.createElement("div");
      let img1 = document.createElement("img");
      let img2 = document.createElement("img");
      img1.src = "./img/close.svg";
      img1.alt = "close-task";
      img1.id = "close-task";
      img1.title = "delete";
      img2.src = "./img/move_up.svg";
      img2.alt = "close-task";
      img2.id = "move-task";
      img2.title = "move to daily";
      div.appendChild(img1);
      div.appendChild(img2);
      li.appendChild(div);
    }
  }
  inputTask.value = "";
  duetaskdate.value = "";

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

// tasklist[0].addEventListener(
//   "click",
//   function (e) {
//     if (e.target.tagName === "LI" && e.target.parentElement.id === "daily-task-list") {
//       e.target.classList.toggle("task-done");
//       saveDataDaily();
//     } else if (e.target.tagName === "IMG" && e.target.id === "close-task") {
//       let answer = window.confirm("Do you want to delet?");
//       if (answer == true) {
//         e.target.parentElement.parentElement.remove();
//         saveDataDaily();
//       }
//     }
//   },
//   false
// );

tasklist.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI" && e.target.parentElement.id === "today-task-list") {
      e.target.classList.toggle("task-done");
      saveDataToday();
    } else if (e.target.tagName === "IMG" && e.target.id === "close-task") {
      let answer = window.confirm("Do you want to delet?");
      if (answer == true) {
        e.target.parentElement.parentElement.remove();
        saveDataToday();
      }
    } else if (e.target.tagName === "IMG" && e.target.id === "move-task") {
      let li = document.createElement("li");
      li.innerHTML = e.target.parentElement.parentElement.innerHTML;
      e.target.parentElement.parentElement.remove();
      tasklist.appendChild(li);
      saveDataDaily();
      saveDataToday();
    }
  },
  false
);

// tasklist[2].addEventListener(
//   "click",
//   function (e) {
//     if (e.target.tagName === "IMG" && e.target.id === "close-task") {
//       let answer = window.confirm("Do you want to delet?");
//       if (answer == true) {
//         e.target.parentElement.parentElement.remove();
//         saveDataOthers();
//       }
//     } else if (e.target.tagName === "IMG" && e.target.id === "move-task") {
//       let li = document.createElement("li");
//       li.innerHTML = e.target.parentElement.parentElement.innerHTML;
//       e.target.parentElement.parentElement.remove();
//       tasklist[1].appendChild(li);
//       saveDataToday();
//       saveDataOthers();
//     }
//   },
//   false
// );

function saveDataToday() {
  localStorage.setItem("todayList", tasklist.innerHTML);
}
function showTasks() {
  tasklist.innerHTML = localStorage.getItem("todayList");
}
showTasks();
