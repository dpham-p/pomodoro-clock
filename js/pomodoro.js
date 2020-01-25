const timeElement = document.querySelector('.time');
const playButton = document.querySelector('.play');
const stopButton = document.querySelector('.stop');
const resetButton = document.querySelector('.reset');
const text = document.querySelector('.text');
const audio = document.querySelector('#audio');
const pomodoroMins = document.querySelector('#pomodoroMins');
const pomodoroSecs = document.querySelector('#pomodoroSecs');
const breakMins = document.querySelector('#breakMins');
const breakSecs = document.querySelector('#breakSecs');
const save = document.querySelector('.save');

playButton.addEventListener('click', function() {
  if (!(minutes === 0 && seconds === 0)) {
    startTimer();
  }
});
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

pomodoroMins.addEventListener('change', adjustPomoMins);
pomodoroSecs.addEventListener('change', adjustPomoSecs);
breakMins.addEventListener('change', adjustBreakMins);
breakSecs.addEventListener('change', adjustBreakSecs);
save.addEventListener('click', adjustTime);

let minutes = 25;
let seconds = 0;

let formattedSeconds = ('0' + seconds).slice(-2);
let formattedMinutes = ('0' + minutes).slice(-2);
let pomodoro = true;

let pomoMins = 25;
let pomoSecs = 0;

let brkMins = 5;
let brkSecs = 0;

let timer;
let timerOn = false;

function startTimer() {
  if (!timerOn) {
    timer = setInterval(setTime, 1000);
    timerOn = true;
  }
}

function stopTimer() {
  clearInterval(timer);
  timerOn = false;
  audio.load();
}

function resetTimer() {
  stopTimer();
  if (pomodoro) {
    minutes = pomoMins;
    seconds = pomoSecs;
  } else {
    minutes = brkMins;
    seconds = brkSecs;
  }
  displayTime();
}

function setTime() {
  seconds--;
  if (seconds === -1) {
    minutes--;
    seconds = 59;
  }

  if (minutes == 0 && seconds == 0) {
    clearInterval(timer);
    audio.play();
    if (pomodoro) {
      minutes = brkMins;
      seconds = brkSecs;
      pomodoro = false;
    } else {
      minutes = pomoMins;
      seconds = pomoSecs;
      pomodoro = true;
    }
    timerOn = false;
  }

  displayTime();
  pomodoro ? displayText('Pomodoro Time!') : displayText('Break Time!');
}

function displayTime() {
  formattedSeconds = ('0' + seconds).slice(-2);
  formattedMinutes = ('0' + minutes).slice(-2);
  timeElement.innerHTML = formattedMinutes + ':' + formattedSeconds;
}

function displayText(string) {
  text.innerHTML = string;
}

function adjustPomoMins(e) {
  pomoMins = e.target.value;
  e.target.value = ('0' + e.target.value).slice(-2);
}

function adjustPomoSecs(e) {
  pomoSecs = e.target.value;
  e.target.value = ('0' + e.target.value).slice(-2);
}

function adjustBreakMins(e) {
  brkMins = e.target.value;
  e.target.value = ('0' + e.target.value).slice(-2);
}

function adjustBreakSecs(e) {
  brkSecs = e.target.value;
  e.target.value = ('0' + e.target.value).slice(-2);
}

function adjustTime() {
  if (pomodoro) {
    minutes = pomoMins;
    seconds = pomoSecs;
  } else {
    minutes = brkMins;
    seconds = brkSecs;
  }
  displayTime();
}

displayTime();
