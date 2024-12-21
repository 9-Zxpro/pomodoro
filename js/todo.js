// var d = new Date();
// var date = d.toISOString().slice(0,10);

const inputTask = document.getElementById("input-task");
const tasklist = document.querySelector(".today-text-bar ul");

function addTask() {
  if (inputTask.value === "") {
    alert("please, enter a valid task");
    return;
  } else {
    const li = document.createElement("li");
    li.className = "task-item";

    let trimvalue = inputTask.value.trim();
    if (trimvalue === "") {
      alert("Task can't be empty.");
      return;
    } else {
      li.innerHTML = trimvalue;
    }
    listMaker();
    tasklist.appendChild(li);
    saveDataToday();

    function listMaker() {
      const p = document.createElement("p");
      const now = new Date();
      p.innerHTML = now.toString().substring(0, 21);

      const img = document.createElement("img");
      img.src = "./img/unchecked_circle.svg";
      img.alt = "unchecked_circle";
      img.id = "unchecked_task";

      const div = document.createElement("div");
      div.className = "kebab-icon";
      div.addEventListener("click", toggleKebabMenu);

      for (let i = 0; i < 3; i++) {
        const span = document.createElement("span");
        span.className = "dot";
        div.appendChild(span);
      }

      // Create the kebab menu dynamically for each item
      const ul = document.createElement("ul");
      ul.className = "kebab-menu hidden";
      const actions = ["Edit", "Delete"];

      actions.forEach((action) => {
        const menuItem = document.createElement("li");
        menuItem.textContent = action;
        menuItem.onclick = () => handleMenuItemClick(action); // Attach click event for menu actions
        ul.appendChild(menuItem);
      });

      li.appendChild(img);
      li.appendChild(p);
      li.appendChild(div);
      li.appendChild(ul);
    }
  }
  inputTask.value = "";
}

const addtask = document.querySelector(".task-dialog button");
addtask.addEventListener("click", () => {
  addTask();
});

inputTask.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

tasklist.addEventListener("click", function (e) {
  if (
    e.target.tagName === "LI" &&
    e.target.parentElement.id === "today-task-list"
  ) {
    e.target.classList.toggle("task-done");

    const imgElement = e.target.querySelector("img");

    if (imgElement) {
      if (e.target.classList.contains("task-done")) {
        imgElement.src = "../img/task_alt_black_24dp.svg";
        e.target.querySelectorAll(".kebab-menu li")[0].remove(); 
      } else {
        imgElement.src = "../img/unchecked_circle.svg";
        const menu = e.target.querySelector(".kebab-menu");
        const editElement = document.createElement("li");
        editElement.textContent = "Edit";
        menu.insertBefore(editElement, menu.childNodes[0]);
      }
      
    }
    saveDataToday();
  }
});
tasklist.addEventListener("mouseover", function (event) {
  if (
    event.target.tagName === "LI" &&
    event.target.parentNode.id === "today-task-list" &&
    !event.target.classList.contains("task-done")
  ) {
    const imgElement = event.target.querySelector("img");
    if (imgElement) {
      const hoverImageSource = "../img/check_circle.svg";
      imgElement.src = hoverImageSource;
    }
  }
});

tasklist.addEventListener("mouseout", function (event) {
  if (
    event.target.tagName === "LI" &&
    event.target.parentNode.id === "today-task-list" &&
    !event.target.classList.contains("task-done")
  ) {
    const imgElement = event.target.querySelector("img");
    if (imgElement) {
      const originalImageSource = "../img/unchecked_circle.svg";
      if (originalImageSource) {
        imgElement.src = originalImageSource;
      }
    }
  }
});

function saveDataToday() {
  localStorage.setItem("todayList", tasklist.innerHTML);
}
function showTasks() {
  tasklist.innerHTML = localStorage.getItem("todayList");
}
showTasks();

// Function to toggle the visibility of the kebab menu
function toggleKebabMenu(event) {
  event.stopPropagation(); // Prevent click from propagating to document
  const menu = event.currentTarget.nextElementSibling; // Select the sibling menu
  if (menu) {
    const openMenus = document.querySelectorAll(".kebab-menu:not(.hidden)");
    openMenus.forEach((m) => {
      if (m !== menu) {
        m.classList.add("hidden"); // Close other menus
      }
    });
    menu.classList.toggle("hidden"); // Toggle the menu
  }
}

// Function to handle menu item clicks
function handleMenuItemClick(action) {
  alert(`${action} clicked`);
  // Close all open menus after an action
  const openMenus = document.querySelectorAll(".kebab-menu:not(.hidden)");
  openMenus.forEach((menu) => menu.classList.add("hidden"));
}

// Close menu if clicked outside
document.addEventListener("click", (event) => {
  const openMenus = document.querySelectorAll(".kebab-menu:not(.hidden)");
  openMenus.forEach((menu) => {
    if (
      !menu.contains(event.target) &&
      !menu.previousElementSibling.contains(event.target)
    ) {
      menu.classList.add("hidden");
    }
  });
});

// Add event listeners for kebab icons
const kebabIcons = document.querySelectorAll(".kebab-icon");
kebabIcons.forEach((icon) => {
  icon.addEventListener("click", toggleKebabMenu);
});

const kebabMenu = document.querySelectorAll(".kebab-menu");
kebabMenu.forEach((menu) => {
  menu.addEventListener(
    "click",
    function (e) {
      if (
        e.target.innerHTML === "Delete" &&
        e.target.parentElement.className === "kebab-menu"
      ) {
        let answer = window.confirm("Do you want to delet?");
        if (answer == true) {
          e.target.parentElement.parentElement.remove();
          saveDataToday();
        }
      }
    },
    false
  );
});
