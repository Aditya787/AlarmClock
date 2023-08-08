// Get DOM elements
const timeElement = document.getElementById("time");
const hourInput = document.getElementById("hour");
const minuteInput = document.getElementById("minute");
const secondInput = document.getElementById("second");
const ampmInput = document.getElementById("ampm");
const setAlarmButton = document.getElementById("setAlarm");
const alarmsList = document.getElementById("alarms");

// Update clock every second
function updateClock() {
  const now = new Date();
  const hours = now.getHours() % 12 || 12;
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = now.getHours() >= 12 ? "PM" : "AM";

  timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

setInterval(updateClock, 1000);

// Alarm functionality
setAlarmButton.addEventListener("click", () => {
  const hour = parseInt(hourInput.value);
  const minute = parseInt(minuteInput.value);
  const second = parseInt(secondInput.value);
  const ampm = ampmInput.value;

  if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
    alert("Please enter valid numbers for hours, minutes, and seconds.");
    return;
  }

  const alarmTime = new Date();
  alarmTime.setHours(ampm === "am" ? hour : hour + 12, minute, second, 0);

  if (alarmTime <= new Date()) {
    alert("Please set a future time for the alarm.");
    return;
  }

  const alarmLi = document.createElement("li");
  alarmLi.innerHTML = `
    Alarm: ${hour}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")} ${ampm}
    <button class="deleteAlarm">Delete</button>
  `;
  alarmsList.appendChild(alarmLi);

  // Clear input fields
  hourInput.value = "";
  minuteInput.value = "";
  secondInput.value = "";
});

// Delete alarm functionality
alarmsList.addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteAlarm")) {
    const alarmItem = event.target.parentElement;
    alarmsList.removeChild(alarmItem);
  }
});
