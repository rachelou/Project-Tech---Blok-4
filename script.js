const selectEl = document.getElementById("category");
const checkboxEl = document.getElementById("check");
const checkboxRequestEl = document.getElementById("request-sort-check");
const contentEl = document.querySelector(".toggle-button");
const requestCheckboxEl = document.getElementById("request-sort-check");
const requestContentEl = document.querySelector(".request-sort-toggle-button");
const datepickerEl = document.querySelector(".single-day-date-picker");
const datePickerMan = document.querySelector(".single-day-date-picker-input");
const desiredTimeFrame = document.querySelector(".desired-time-frame-selector");
const desiredTimeFrameResponsive = document.querySelector(
  ".responsive-desired-timeframe-selector"
);
document.getElementById("date").valueAsDate = new Date();
document.getElementById("time").valueAsDate = new Date();

const desiredTimeFramelabel = document.querySelector(
  ".input-type-label-desired-timeframe"
);

const desiredTimeFrameText = document.querySelector(
  ".single-day-date-picker > p"
);
const specificDayRequestButtonEl = document.querySelector(".blue-button");
const specificDayRequestEl = document.querySelectorAll(
  ".input-type-label-request-sort, .request-sort-toggle-button"
);

checkboxEl.addEventListener("change", () => {
  if (checkboxEl.checked) {
    contentEl.style.setProperty("--before-color", "#AFAFAF");
    contentEl.style.setProperty("--after-color", "#000D39");
    instructions.classList.remove("hidden");
    datepickerEl.classList.add("hidden");
    specificDayRequestEl.forEach((el) => el.classList.add("hidden"));
    specificDayRequestButtonEl.classList.add("hidden");
    requestContentEl.classList.add("hidden");
  } else {
    contentEl.style.setProperty("--before-color", "#000D39");
    contentEl.style.setProperty("--after-color", "#AFAFAF");
    instructions.classList.add("hidden");
    datepickerEl.classList.remove("hidden");
    specificDayRequestEl.forEach((el) => el.classList.remove("hidden"));
    specificDayRequestButtonEl.classList.remove("hidden");
  }
  return;
});

requestCheckboxEl.addEventListener("change", () => {
  if (checkboxRequestEl.checked) {
    requestContentEl.style.setProperty("--before-color", "#AFAFAF");
    requestContentEl.style.setProperty("--after-color", "#000D39");
    datePickerMan.classList.remove("hidden");
    desiredTimeFrame.classList.add("hidden");
    desiredTimeFrameResponsive.classList.add("hidden");
    desiredTimeFramelabel.classList.add("hidden");
    desiredTimeFramelabel.classList.add("hidden");
    desiredTimeFrameText.classList.add("hidden");
  } else {
    requestContentEl.style.setProperty("--before-color", "#000D39");
    requestContentEl.style.setProperty("--after-color", "#AFAFAF");
    datePickerMan.classList.add("hidden");
    desiredTimeFrame.classList.remove("hidden");
    desiredTimeFrameResponsive.classList.remove("hidden");
    desiredTimeFramelabel.classList.remove("hidden");
    desiredTimeFrameText.classList.remove("hidden");
  }

  return;
});
const showMoreButton = document.querySelector("#show-more-button");
const expandedDay = document.querySelectorAll(".table-heading.expanded");
const expandedDayLabel = document.querySelectorAll(".checkbox-button-expanded");

let isExpanded = false;

showMoreButton.addEventListener("click", () => {
  if (!isExpanded) {
    desiredTimeFrame.style.gridTemplateColumns = "repeat(6, 1fr)";
    expandedDay.forEach((day) => {
      day.classList.remove("hidden");
    });
    showMoreButton.value = "< Show less";
    desiredTimeFrame.classList.add("expanded");
    expandedDayLabel.forEach((label) => {
      label.classList.remove("hidden");
    });

    isExpanded = true;
  } else {
    desiredTimeFrame.style.gridTemplateColumns = "repeat(4, 1fr)";
    expandedDay.forEach((day) => {
      day.classList.add("hidden");
    });
    desiredTimeFrame.classList.remove("expanded");
    showMoreButton.value = "Show more > ";

    expandedDayLabel.forEach((label) => {
      label.classList.add("hidden");
    });
    isExpanded = false;
  }
});
