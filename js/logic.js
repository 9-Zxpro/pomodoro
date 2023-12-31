
const semicircles = document.querySelectorAll('.semicircle'),
playPause = document.querySelectorAll('.timer-controller button'),
timestamp = document.querySelector('.time-stamp'),
tiktok = document.querySelector('.tik-tok'),
selectMenu = document.querySelectorAll('.tik-tok select'),
repeatingNo = document.querySelector('.timer-repeater select'),
repeatedNo = document.querySelectorAll('.timer-repeater span');

let ringTone1 = new Audio("./img/triangle-metal.mp3");
let ringTone2 = new Audio("./img/tuntun.mp3");

let timerloop, r = 0;

for(let i=59; i>0; i--) {
    i=i<10?"0"+i:i;
    let option = `<option value"${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);    
}
for(let i=59; i>0; i--) {
    i=i<10?"0"+i:i;
    let option = `<option value"${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);    
}
for(let i=150; i>1; i--) {
    let option = `<option value"${i}">${i}</option>`;
    repeatingNo.firstElementChild.insertAdjacentHTML("afterend", option);    
}

function reSet() {
    selectMenu[0].value = `00`;
    selectMenu[1].value = `00`;
    
    semicircles[0].style.display = 'none';
    semicircles[1].style.display = 'none';
    semicircles[2].style.display = 'none';
    
    timestamp.classList.remove("disable");
    playPause[1].querySelector('img').src = "./img/play_arrow_FILL0.svg";
    playPause[1].style.background = "#08f9ff";
}
function resetter() {
    const min = `${selectMenu[0].value}`,
    sec = `${selectMenu[1].value}`;

    const time = `${min}:${sec}`;
    // !time.includes("00:00")
    if(timerloop){
        reSet();
        repeatedNo[0].innerText = `0`;
        repeatingNo.value = `1`;
        clearInterval(timerloop);
        timerloop = null;
        r=0;
    }
}
playPause[0].addEventListener("click", resetter);

function timerRepeater() {
    const min = `${selectMenu[0].value}`,
    sec = `${selectMenu[1].value}`;

    const time = `${min}:${sec}`;
    
    if(time.includes("00:00")){
        return alert("Please, select a valid time");
    }

    timestamp.classList.add("disable");
    playPause[1].querySelector('img').src = "./img/pause_FILL0.svg";
    playPause[1].style.background = "#ff7500";

    const repeatValue = `${repeatingNo.value}`;

    function repeat() {
        if(r < repeatValue){
            const min = `${selectMenu[0].value}`,
                sec = `${selectMenu[1].value}`;

                const minutes = min*60000,
                seconds = sec*1000,
                setTime = minutes + seconds,
                startTime = Date.now(),
                futureTime = startTime + setTime;

            timerloop=setInterval(function() {
                countDowntimer(min, sec, repeatValue, setTime, futureTime, repeat);
              }, 1000);
        
            r++;
        }
    }
    repeat();
}
playPause[1].addEventListener("click", timerRepeater);

// circular-progress and timer update
function countDowntimer(min, sec, repeatValue, setTime, futureTime, repeat) {
    console.log(min, sec, repeatValue, setTime, futureTime);
    
    semicircles[0].style.display = 'block';
    semicircles[1].style.display = 'block';
    semicircles[2].style.display = 'block';

    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
    const angle = (remainingTime / setTime) * 360;


    if(angle > 180) {
        semicircles[2].style.display = 'none';
        semicircles[0].style.transform = 'rotate(180deg)';
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    } else {
        semicircles[2].style.display = 'block';
        semicircles[0].style.transform = `rotate(${angle}deg)`;
        semicircles[1].style.transform = `rotate(${angle}deg)`;
    }

    const mins = Math.floor((remainingTime/(1000*60)) % 60).toLocaleString('en-US', {minimumIntegerDigits:2, useGrouping:false}),
    secs = Math.floor((remainingTime/1000) % 60).toLocaleString('en-US', {minimumIntegerDigits:2, useGrouping:false});

    selectMenu[0].value = `${mins}`;
    selectMenu[1].value = `${secs}`;

    if(remainingTime <= 0) {
        clearInterval(timerloop);

        if(repeatValue == r) {
            reSet();
            console.log("if");
        } else {
            selectMenu[0].value = `${min}`;
            selectMenu[1].value = `${sec}`;
            
            semicircles[0].style.transform = '';
            semicircles[1].style.transform = '';
            semicircles[2].style.transform = '';

            console.log("else");
            
        }
        ringTone1.play();
        ringTone1.loop = false;
        repeatedNo[0].innerText = `${r}`;

        repeat();
    }
}


