document.addEventListener("DOMContentLoaded", async () => {
  const { question, options } = await getInitialQuestionAndOptions();

  let optionCount = options.length;

  document.getElementById("question").value = question;

  options.forEach((option, index) => {
    insertNewOptionToHtml(option, index + 1);
  });

  document.getElementById("add-option").addEventListener("click", () => {
    insertNewOptionToHtml("", ++optionCount);
  });

  document.getElementById("createPollForm").onsubmit = submitUpdatedPoll;
});

const getInitialQuestionAndOptions = async () => {
  const code = localStorage.getItem("code");
  const response = await fetch(`${API_URL}/join/?code=${code}`);
  const data = await response.json();
  return {
    question: data.question,
    options: data.options.map((option) => option.text),
  };
};

const insertNewOptionToHtml = (newOptionText, newOptionIndex) => {
  const newOption = document.createElement("div");
  newOption.className = "option";
  newOption.id = `option${newOptionIndex}`;
  newOption.innerHTML = `
    <div class="option-left">
      <span></span>
    </div>
    <textarea
      name="option${newOptionIndex}"
      placeholder="Type an option here..."
      rows="1"
    >${newOptionText}</textarea>
    <div class="option-right" onclick="deleteOption('option${newOptionIndex}')">
      <div>
        <i class="fas fa-trash"></i>
      </div>
    </div>
  `;
  document
    .getElementById("createPollForm")
    .insertBefore(newOption, document.getElementById("error-message"));
};

const deleteOption = (optionId) => {
  document.getElementById(optionId).remove();
};

const submitUpdatedPoll = async (e) => {
  e.preventDefault();
  const question = document.getElementById("question").value;
  const errorMessage = document.getElementById("error-message");

  if (question.trim() === "") {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "Please fill in the question.";
    errorMessage.style.display = "block";
    return;
  } else {
    errorMessage.style.display = "none";
  }

  const options = Array.from(document.getElementsByClassName("option"))
    .map((option) => option.querySelector("textarea").value)
    .filter((option) => option.trim() !== "");

  if (options.length < document.getElementsByClassName("option").length) {
    errorMessage.textContent = "Please fill in all options.";
    errorMessage.style.display = "block";
    return;
  } else {
    errorMessage.style.display = "none";
  }

  const code = localStorage.getItem("code");
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ question, options, code }),
  });

  if (response.status === 200) {
    window.location.href = `/result/?code=${code}`;
  } else {
    alert("Failed to update poll. Please try again.");
  }
};
