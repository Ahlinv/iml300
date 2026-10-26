
const DURATION_SECONDS = 300; // 5 minutes
const STORAGE_KEY = "shared_timer_end_time";

function initVisualTimer() {
  const textDisplay = document.getElementById("countdown-text");
  const ring = document.getElementById("progress-ring");
  
  // FIX: Safely exit if elements don't exist on this specific HTML page
  if (!textDisplay || !ring) {
    console.warn("Timer elements not found on this page.");
    return;
  }
  
  // Calculate the circle circumference (2 * pi * r) where r = 45
  const circumference = 2 * Math.PI * 45;
  ring.style.strokeDasharray = circumference;

  let endTime = localStorage.getItem(STORAGE_KEY);

  if (!endTime) {
    endTime = Date.now() + (DURATION_SECONDS * 1000);
    localStorage.setItem(STORAGE_KEY, endTime);
  } else {
    endTime = parseInt(endTime, 10);
  }

  function updateClock() {
    const now = Date.now();
    const timeLeftMs = endTime - now;

    if (timeLeftMs <= 0) {
      clearInterval(interval);
      textDisplay.textContent = "00:00";
      ring.style.strokeDashoffset = circumference; // Empty ring
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    const totalSecondsLeft = Math.floor(timeLeftMs / 1000);
    
    // Update Text Display
    const minutes = Math.floor(totalSecondsLeft / 60);
    const seconds = totalSecondsLeft % 60;
    textDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Update Circle Visualization (Fraction of time remaining)
    const fractionRemaining = totalSecondsLeft / DURATION_SECONDS;
    const offset = circumference - (fractionRemaining * circumference);
    ring.style.strokeDashoffset = offset;
  }

  // Run immediately, then every second
  updateClock();
  const interval = setInterval(updateClock, 1000);
}

// Ensures HTML elements are loaded before the script interacts with them
window.addEventListener("DOMContentLoaded", initVisualTimer);