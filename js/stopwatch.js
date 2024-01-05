const stoplay = document.querySelectorAll('.stopwatch-controller button'),
    ticker = document.querySelector('#stopwatch-tiktok p'),
    stopwatchCountdown = document.querySelector('.stopwatch-countdown'),
    docTitle = document.title;

let [mili, seconds, minutes, hours] = [0, 0, 0, 0];
let interval = null;

function stopWatch() {
    mili++;
    if (mili > 99) {
        mili = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    ticker.innerHTML = `${h}:${m}:${s}<span style="color:#ff7500;">.${mili}</span>`;
    document.title = `${mins}` + ":" + `${secs}` + " Focus time";

}

function start() {
    if (stoplay[1].value === "play") {

        if (interval !== null) {
            clearInterval(interval);
        }
        interval = setInterval(stopWatch, 10);

        stoplay[1].style.display = "none";
        stoplay[2].style.display = "block";
        stoplay[0].style.display = "block";

    }
}
stoplay[1].addEventListener("click", start);

function stopp() {
    clearInterval(interval);

    stoplay[2].style.display = "none";
    stoplay[1].style.display = "block";

}
stoplay[2].addEventListener("click", stopp);

function reSet() {
    clearInterval(interval);
    [seconds, minutes, hours] = [0, 0, 0];
    ticker.innerHTML = '00:00:00<span>.0</span>';
    document.title = docTitle;

    stoplay[2].style.display = "";
    stoplay[1].style.display = "block";
    stoplay[0].style.display = "";

    stopwatchCountdown.style.filter = "";
}
stoplay[0].addEventListener("click", reSet);