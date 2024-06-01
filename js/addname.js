const maincontainer = document.getElementById("main-container");
const addname = document.getElementById("addname");
const nameval = document.getElementById("naming");
const username = document.querySelector(".name span");
const setname = document.getElementById("set-name");

window.onload = function () {
    if(localStorage.getItem("myname") == null) {
        setTimeout(appeardiv, 2000);
    } else {
        username.innerHTML = localStorage.getItem("myname");
    }
};
function appeardiv() {
  maincontainer.style.filter = "blur(16px)";
  addname.style.display = "block";
  setname.addEventListener("click", () =>{
    validation();
  })
  
}
function validation() {
  if (nameval.value === "") {
    alert("please, enter a valid name");
    return;
  } else {
    let trimvalue = nameval.value.trim();
    if (trimvalue === "") {
      alert("Your name is empty please enter again.");
      return;
    } else {
        username.innerHTML = trimvalue;
        saveName();
    }
  }
  maincontainer.style.filter = "none";
  addname.style.display = "none";

}

function saveName() {
    localStorage.setItem("myname", username.innerHTML);
}
