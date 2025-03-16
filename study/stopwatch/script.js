const appendTens = document.getElementById('tens');
const appendSeconds = document.getElementById('seconds');
const buttonStart = document.getElementById('button-start');
const buttonStop = document.getElementById('button-stop');
const buttonReset = document.getElementById('button-reset');

let seconds = 0;
let tens = 0;
let interval;

buttonStart.onclick = () => {
    interval = setInterval(startTimer, 10);
}

buttonStop.onclick = () => {
    clearInterval(interval);
}

buttonReset.onclick = () => {
    clearInterval(interval);
    tens = 0;
    seconds = 0;
    appendTens.innerText = tens;
    appendSeconds.innerText = seconds;
}

function startTimer() {
    tens++;

    if(tens > 99) {
        seconds++;
        appendSeconds.innerText = seconds;

        tens = 0;
        appendTens.innerText = tens;
    } else {
        appendTens.innerText = tens;
    }
}