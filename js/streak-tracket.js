const DAYS_PER_WEEK = 7;
const BOX_SIZE = 10;
const SPACING = 3;
const TOTAL_WEEKS = 6;

const currentYear = new Date().getFullYear();

const MONTHS = [
  { name: "Jan", days: 31 },
  { name: "Feb", days: isLeapYear(currentYear) ? 29 : 28 },
  { name: "Mar", days: 31 },
  { name: "Apr", days: 30 },
  { name: "May", days: 31 },
  { name: "Jun", days: 30 },
  { name: "Jul", days: 31 },
  { name: "Aug", days: 31 },
  { name: "Sep", days: 30 },
  { name: "Oct", days: 31 },
  { name: "Nov", days: 30 },
  { name: "Dec", days: 31 },
];

const COLORS = ["day", "completed"];
const DAYS_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const svg = document.getElementById("streak-svg");

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function createGroupedGrid() {
  let xOffset = 0;

  const streakTable = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "g"
  );
  streakTable.setAttribute("transform", `translate(28, 0)`); 

  MONTHS.forEach((month, monthIndex) => {
    const monthGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    monthGroup.setAttribute("class", `month month-${monthIndex + 1}`);
    monthGroup.setAttribute("transform", `translate(${xOffset + SPACING}, 0)`);

    const firstDayOfMonth = new Date(currentYear, monthIndex, 1).getDay();
    let dayCounter = 1;
    let yOffset = 0;

    // Adjust initial yOffset based on the first day of the month
    if (firstDayOfMonth != 0) {
      yOffset = firstDayOfMonth * (BOX_SIZE + SPACING);
    }

    for (let week = 0; week < TOTAL_WEEKS; week++) {
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const dayIndex = week * 7 + dayOfWeek; // Calculate the overall day index
        if (dayIndex < firstDayOfMonth) continue; // Skip days before the 1st
        if (dayCounter > month.days) continue; // Stop if we've reached the end of the month

        const rect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        rect.setAttribute("x", week * (BOX_SIZE + SPACING)); // Week is now x
        rect.setAttribute("y", dayOfWeek * (BOX_SIZE + SPACING)); // Day of week is now y
        rect.setAttribute("width", BOX_SIZE);
        rect.setAttribute("height", BOX_SIZE);
        rect.setAttribute("rx", 1);
        rect.setAttribute("ry", 1);
        rect.setAttribute("class", COLORS[0]);
        monthGroup.appendChild(rect);

        dayCounter++;
      }
    }

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", 2 * (BOX_SIZE + SPACING));
    text.setAttribute("y", 104);
    text.setAttribute("class", "month-label");
    text.textContent = month.name;
    text.setAttribute("text-anchor", "middle");
    monthGroup.appendChild(text);

    streakTable.appendChild(monthGroup);
    xOffset += 6 * (BOX_SIZE + SPACING) + SPACING;
  });

  DAYS_NAMES.forEach((day, index) => {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("class", "wday, month-label");
    text.setAttribute("dx", "-13");
    text.setAttribute("dy", index * (BOX_SIZE + SPACING) + 10);
    text.textContent = day;
    streakTable.appendChild(text);
  });

  svg.appendChild(streakTable);
}
createGroupedGrid();

document.addEventListener("DOMContentLoaded", () => {
  const listItems = document.querySelectorAll(
    ".list-check input[type='checkbox']"
  );
  const storageKeyCheckbox = "checkboxStatus"; // Storage key for checkbox states
  const storageKeyDates = "completedDates"; // Storage key for completed dates

  const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format

  // Helper function to check if all checkboxes are checked for a specific day
  function areAllCheckboxesChecked() {
    return Array.from(listItems).every((item) => item.checked);
  }

  // Load stored checkbox status
  const storedCheckboxData =
    JSON.parse(localStorage.getItem(storageKeyCheckbox)) || {};

  // If stored data is from today, update the checkboxes
  if (storedCheckboxData.date === today) {
    storedCheckboxData.statuses.forEach((item) => {
      const checkbox = document.getElementById(item.id);
      if (checkbox) {
        checkbox.checked = item.checked;
      }
    });
  } else {
    // Clear old checkbox data if it's from a previous day
    localStorage.removeItem(storageKeyCheckbox);
  }

  // Load stored completed dates
  const completedDates =
    JSON.parse(localStorage.getItem(storageKeyDates)) || [];

  const totalActiveDays = document.querySelector("#total-days");
  totalActiveDays.textContent = completedDates.length;

  const maxStreakDays = document.querySelector("#max-streak");
  maxStreakDays.textContent = getMaxStreak();
  function getMaxStreak() {
    if (completedDates.length === 0) return 0;

    let maxStreak = 1;
    let currentStreak = 1;

    for(let i=1; i<completedDates.length; i++) {
      const currDateObj = new Date(completedDates[i]);
      const prevDateObj = new Date(completedDates[i-1]);  
      const diff = currDateObj - prevDateObj;
      const diffInDays = diff / (1000 * 60 * 60 * 24);
      
      if (diffInDays === 1) {
        currentStreak++;
      } else {
        maxStreak = Math.max(maxStreak, currentStreak);
        currentStreak = 1;
      }
      
    }
    maxStreak = Math.max(maxStreak, currentStreak)

    return maxStreak;
  }


  // Function to mark completed dates on the grid
  function markCompletedDates() {
    completedDates.forEach((date) => {
      const parsedDate = new Date(date);
      const monthIndex = parsedDate.getMonth() + 1;
      const dayOfMonth = parsedDate.getDate();

      // Select all rect elements within the specific month group
      const monthGroup = document.querySelector(`.month-${monthIndex}`);
      if (monthGroup) {
        const rects = monthGroup.querySelectorAll("rect");

        // Mark the specific rect corresponding to the day of the month
        if (dayOfMonth > 0 && dayOfMonth <= rects.length) {
          const targetRect = rects[dayOfMonth]; // Day 1 corresponds to rect[0]

          if (targetRect) {
            targetRect.classList.add("completed");
            targetRect.classList.remove("day");
          }
        }
      }
    });
  }

  // Add event listeners to checkboxes to track completion and update localStorage
  listItems.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const checked = areAllCheckboxesChecked();
      if (checked) {
        completedDates.push(today);
      } else {
        const index = completedDates.indexOf(today);
        if (index !== -1) {
          completedDates.splice(index, 1); // Remove today's date if unchecked
        }
      }

      // Save updated checkbox states and completed dates to localStorage
      localStorage.setItem(
        storageKeyCheckbox,
        JSON.stringify({
          date: today,
          statuses: Array.from(listItems).map((item) => ({
            id: item.id,
            checked: item.checked,
          })),
        })
      );

      localStorage.setItem(storageKeyDates, JSON.stringify(completedDates));

      markCompletedDates();
    });
  });

  markCompletedDates();
});
