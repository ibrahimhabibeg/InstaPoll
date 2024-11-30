document
  .getElementById("createPollForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const question = document.getElementById("question").value;
    const options = Array.from(document.querySelectorAll(".option textarea"))
      .map((option) => option.value)
      .filter((option) => option.trim() !== "");

    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, options }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("code", data.code);
      localStorage.setItem("token", data.token);
      window.location.href = `/result/?code=${data.code}`;
    } else {
      alert("Failed to create poll. Please try again.");
    }
  });

let optionCount = 2;

function addOption() {
  optionCount++;
  const option = document.createElement("div");
  option.classList.add("option");
  option.id = `option${optionCount}`;
  option.innerHTML = `
            <div class="option-left">
              <span></span>
            </div>
            <textarea
              name="option${optionCount}"
              placeholder="Type an option here..."
              rows="1"
            ></textarea>
            <div class="option-right">
              <div onclick="deleteOption('option${optionCount}')">
                <i class="fas fa-trash"></i>
              </div>
            </div>
        `;

  document
    .getElementById("createPollForm")
    .insertBefore(option, document.getElementById("add-option"));
}

function deleteOption(id) {
  const option = document.getElementById(id);
  option.remove();
}
