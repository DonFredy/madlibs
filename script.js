// DOM Elements
const storySelectionForm = document.getElementById("storySelection");
const selectedStory = document.getElementById("selectedStory");
const lunchRoomForm = document.getElementById("lunchRoom");
const weatherReportForm = document.getElementById("weatherReport");
const dialog = document.getElementById("dialog");
const storyDisplay = document.getElementById("story");
const closeBtn = document.getElementById("close");

// Initially hide the forms using d-none
lunchRoomForm.classList.add("d-none");
weatherReportForm.classList.add("d-none");

// Display the appropriate story form based on selection
selectedStory.addEventListener("change", () => {
  const value = selectedStory.value;

  // Hide both forms initially
  lunchRoomForm.classList.add("d-none");
  weatherReportForm.classList.add("d-none");

  if (value === "Lunch Room") {
    lunchRoomForm.classList.remove("d-none");
  } else if (value === "Weather Report") {
    weatherReportForm.classList.remove("d-none");
  }
});

// Helper: Validate a form
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    const inputType = input.getAttribute("type");

    // Check if the input is empty
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add("is-invalid");
      input.nextElementSibling.textContent = "This field is required.";
    } else if (inputType === "number" && isNaN(input.value)) {
      // Additional check for number inputs
      isValid = false;
      input.classList.add("is-invalid");
      input.nextElementSibling.textContent = "Please enter a valid number.";
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    }
  });

  return isValid;
}

// Helper: Clear forms
function clearForms() {
  lunchRoomForm.reset();
  weatherReportForm.reset();

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.classList.remove("is-invalid", "is-valid");
  });
}

// Populate and display the story in the dialog
function displayStory(form, template) {
  const inputs = form.querySelectorAll("input");
  let story = template;

  // Replace placeholders with input values
  inputs.forEach((input) => {
    const placeholder = `[${input.name.toUpperCase()}]`;
    story = story.replace(placeholder, input.value);
  });

  storyDisplay.textContent = story;
  dialog.showModal();
}

// Add event listeners to forms
lunchRoomForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm(lunchRoomForm)) {
    const storyTemplate = `
      Make sure your lunch [LRCONTAINER] is filled with [LRADJECTIVE1] food. 
      Do not go to the [LRADJECTIVE2] food stand across the street from the school. 
      The hamburgers they serve are fried in [LRNOUN] and are made of [LRANIMAL] meat. 
      So take a sandwich made of [LRVEGETABLE1] or [LRVEGETABLE2]. It's much healthier!
    `;
    displayStory(lunchRoomForm, storyTemplate);
  }
});

weatherReportForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm(weatherReportForm)) {
    const storyTemplate = `
      Early tomorrow, a [WRADJECTIVE1] front will collide with a mass of hot 
      [WRPLURALNOUN1] moving from the north. This means we can expect [WRADJECTIVE2] 
      winds and occasional [WRPLURALNOUN2] by late afternoon. Wind velocity will be 
      [WRNUMBER1] miles an hour, and the high temperature should be around [WRNUMBER2] 
      degrees. So, if you're going out, you had better plan on wearing your 
      [WRARTICLEOFCLOTHING].
    `;
    displayStory(weatherReportForm, storyTemplate);
  }
});

// Close the dialog and allow replay
closeBtn.addEventListener("click", () => {
  dialog.close();
  clearForms();
  selectedStory.value = "Select a Story";
  lunchRoomForm.classList.add("d-none");
  weatherReportForm.classList.add("d-none");
});
