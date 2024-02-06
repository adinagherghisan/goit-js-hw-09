// Descris în documentație
import flatpickr from "flatpickr";
// Import suplimentar de stil
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate.getTime() < Date.now()) {
           Notiflix.Notify.warning('Please choose a date in the future');
            return
        }
        startButton.disable = false
    },
};
const startButton = document.querySelector('button[data-start]');
const dayValue = document.querySelector('span[data-days]');
const hourValue = document.querySelector('span[data-hours]');
const minuteValue = document.querySelector('span[data-minutes]');
const secondValue = document.querySelector('span[data-seconds]');

let countDownInterval = null;
let targetDate = null;
function updateTimer() {
    const now = new Date();
    const difference = targetDate - now;
    if (difference < 0) {
        stopCountdown();
        return
    }
    const { days, hours, minutes, seconds } = convertMs(difference);
    dayValue.textContent = addLeadingZero(days);
    hourValue.textContent = addLeadingZero(hours);
    minuteValue.textContent = addLeadingZero(minutes);
    secondValue.textContent = addLeadingZero(seconds);
}


function startCountdown() {
    targetDate = new Date(flatpickrInstance.selectedDates[0]);
    flatpickrInstance.destroy();
    startButton.disabled = true;
    countDownInterval = setInterval(updateTimer, 1000);

};

function stopCountdown() {
    clearInterval(countDownInterval)
};




function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
    return value.toString().padStart(2, '0');

};
const flatpickrInstance = flatpickr('#datetime-picker', options);
startButton.addEventListener('click', startCountdown)