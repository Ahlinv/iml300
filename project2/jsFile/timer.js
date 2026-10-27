
const DURATION_SECONDS = 120; 
const STORAGE_KEY = "shared_timer_end_time";

function initVisualTimer() {
  const textDisplay = document.getElementById("countdown-text");
  const ring = document.getElementById("progress-ring");
  
  if (!textDisplay || !ring) return; // Prevents errors if elements aren't loaded

  const circumference = 2 * Math.PI * 45;
  ring.style.strokeDasharray = circumference;

  let endTime;
  let interval;

  function loadEndTime() {
    let stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      endTime = Date.now() + (DURATION_SECONDS * 1000);
      localStorage.setItem(STORAGE_KEY, endTime);
    } else {
      endTime = parseInt(stored, 10);
    }
  }

  function updateClock() {
    const now = Date.now();
    const timeLeftMs = endTime - now;

    if (timeLeftMs <= 0) {
      clearInterval(interval);
      textDisplay.textContent = "00:00";
      ring.style.strokeDashoffset = circumference;
      localStorage.removeItem(STORAGE_KEY);
      
  
 
    window.location.href = "index.html"; 
 
      return;
    }

    const totalSecondsLeft = Math.floor(timeLeftMs / 1000);
    const minutes = Math.floor(totalSecondsLeft / 60);
    const seconds = totalSecondsLeft % 60;
    textDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const fractionRemaining = totalSecondsLeft / DURATION_SECONDS;
    const offset = circumference - (fractionRemaining * circumference);
    ring.style.strokeDashoffset = offset;
  }

  function startTimer() {
    clearInterval(interval);
    loadEndTime();
    updateClock();
    interval = setInterval(updateClock, 1000);
  }

  // Listen for changes made to localStorage by other tabs/pages
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      startTimer(); 
    }
  });

  startTimer();
}

window.addEventListener("DOMContentLoaded", initVisualTimer);