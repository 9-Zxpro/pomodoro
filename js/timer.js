const semicircles = document.querySelectorAll(".semicircle"),
    playPause = document.querySelectorAll(".timer-controller button"),
    timestamp = document.querySelector("#time-stamp"),
    selectMenu = document.querySelectorAll("#timer-tiktok select"),
    repeatingNo = document.querySelector(".timer-repeater select"),
    repeatedNo = document.querySelectorAll(".timer-repeater span");

let ringTone1 = new Audio("./img/triangle-metal.mp3");
let ringTone2 = new Audio("./img/tuntun.mp3");

// timer selected value of minute, seconds, and No of repeation
let minuteT = 0,
    secondT = 0,
    repeatValueT = 0;

let timerloop,
    r = 0;
let setTime,
    futureTime,
    remainingTime,
    pause = false;

for (let i = 59; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value"${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value"${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 150; i > 1; i--) {
    let option = `<option value"${i}">${i}</option>`;
    repeatingNo.firstElementChild.insertAdjacentHTML("afterend", option);
}

function reSet() {
    selectMenu[0].value = `00`;
    selectMenu[1].value = `00`;

    semicircles[0].style.display = "none";
    semicircles[1].style.display = "none";
    semicircles[2].style.display = "none";

    timestamp.classList.remove("disable");
    playPause[0].style.display = "none";
    playPause[1].style.display = "block";
    playPause[2].style.display = "none";
}
function resetter() {
    if (timerloop) {
        reSet();
        repeatedNo[0].innerText = `0`;
        repeatingNo.value = `1`;
        clearInterval(timerloop);
        timerloop = null;
        r = 0;
    }
}
playPause[0].addEventListener("click", resetter);

function pauseTimer() {
    if (timerloop) {
        clearInterval(timerloop);
        playPause[1].style.display = "block";
        playPause[2].style.display = "none";
        pause = true;
    }
}
playPause[2].addEventListener("click", pauseTimer);

function repeat() {
    if (r < repeatValueT) {
        setTime = parseInt(minuteT, 10) * 60 + parseInt(secondT, 10);
        remainingTime = setTime;

        intervalSetter(repeat);
        r++;
    }
}
function timerRepeater() {
    if (timerloop) {
        intervalSetter(repeat);
    } else {
        (minuteT = `${selectMenu[0].value}`), (secondT = `${selectMenu[1].value}`);
        repeatValueT = `${repeatingNo.value}`;

        const time = `${minuteT}:${secondT}`;

        if (time.includes("00:00")) {
            return alert("Please, select a valid time");
        }

        timestamp.classList.add("disable");

        playPause[0].style.display = "block";
        playPause[1].style.display = "none";
        playPause[2].style.display = "block";

        repeat();
    }
}
playPause[1].addEventListener("click", timerRepeater);

function intervalSetter(repeat) {
    timerloop = setInterval(function () {
        countDowntimer(repeat);
    }, 1000);
}

// circular-progress and timer update
function countDowntimer(repeat) {
    if(pause){
        playPause[2].style.display = "block";
        playPause[1].style.display = "none";
        pause = false;
    } else {
        remainingTime -= 1;
    }

    semicircles[0].style.display = "block";
    semicircles[1].style.display = "block";
    semicircles[2].style.display = "block";
   
    const angle = (remainingTime / setTime) * 360;
    
    if (angle > 180) {
        semicircles[2].style.display = "none";
        semicircles[0].style.transform = "rotate(180deg)";
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    } else {
        semicircles[2].style.display = "block";
        semicircles[0].style.transform = `rotate(${angle}deg)`;
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    }

    const mins = Math.floor(remainingTime / 60).toLocaleString(
        "en-US",
        { minimumIntegerDigits: 2, useGrouping: false }
    ),
        secs = Math.floor(remainingTime % 60).toLocaleString(
            "en-US",
            { minimumIntegerDigits: 2, useGrouping: false}
        );
        
    selectMenu[0].value = `${mins}`;
    selectMenu[1].value = `${secs}`;
    document.title = `${mins}`+":"+`${secs}` + " Focus time";

    if (remainingTime <= 0) {
        clearInterval(timerloop);
        if (repeatValueT == r) {
            ringTone2.play();
            ringTone2.loop = false;
            resetter();
            return;
        } else {
            selectMenu[0].value = `${minuteT}`;
            selectMenu[1].value = `${secondT}`;

            semicircles[0].style.transform = "";
            semicircles[1].style.transform = "";
            semicircles[2].style.transform = "";
        }
        ringTone1.play();
        ringTone1.loop = false;
        repeatedNo[0].innerText = `${r}`;

        repeat();
    }
}
