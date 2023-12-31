const timeSelector = document.querySelectorAll('.choose-section nav a'),
timerBlock = document.querySelector('.timer-block'),
stopwatchBlock = document.querySelector('.stopwatch-block');

function timerVisible() {
    stopwatchBlock.style.visibility = "hidden";
    timerBlock.style.visibility = "visible";
}
timeSelector[0].addEventListener("click", timerVisible);

function stopwatchVisible() {
    stopwatchBlock.style.visibility = "visible";
    timerBlock.style.visibility = "hidden";
}
timeSelector[1].addEventListener("click", stopwatchVisible);