function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
const startButton = document.querySelector('button[data-start]');
const stopButtton = document.querySelector('button[data-stop]');
const body = document.body
let interval = null
function startColors() {
    startButton.disabled = true;
     interval = setInterval(function () {
        const randomColor = getRandomHexColor();
        body.style.backgroundColor = randomColor;
    }, 1000);
};
function stopColors() {
    stopButtton.disabled = false;
    clearInterval(interval);
};
startButton.addEventListener('click', startColors);
stopButtton.addEventListener('click', stopColors);
