const timeSelector = document.querySelectorAll('.choose-section nav a'),
timerBlock = document.querySelector('.timer-block'),
stopwatchBlock = document.querySelector('.stopwatch-block'),
checklistBlock = document.querySelector('.checklist-block');
// bottomBar = document.getElementById('marker');

function checklistVisible() {
    checklistBlock.style.visibility = "visible";
    timerBlock.style.visibility = "hidden";
    stopwatchBlock.style.visibility = "hidden";
}
timeSelector[0].addEventListener("click", checklistVisible);

function timerVisible() {
    checklistBlock.style.visibility = "hidden";
    timerBlock.style.visibility = "visible";
    stopwatchBlock.style.visibility = "hidden";
}
timeSelector[1].addEventListener("click", timerVisible);

function stopwatchVisible() {
    checklistBlock.style.visibility = "hidden";
    timerBlock.style.visibility = "hidden";
    stopwatchBlock.style.visibility = "visible";
}
timeSelector[2].addEventListener("click", stopwatchVisible);