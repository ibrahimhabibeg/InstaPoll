document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const response = await fetch(`http://localhost:3000/join/?code=${code}`);
  if (response.status === 404) {
    alert("Invalid code");
    window.location.href = "/";
  } else {
    const data = await response.json();
    const { question, options } = data;
    console.log(options);
    document.getElementById("question").innerText = question;
    const container = document.querySelector(".container");
    options.forEach((option, index) => {
      const optionDiv = document.createElement("div");
      optionDiv.classList.add("option");
      optionDiv.addEventListener("click", () => handleChoice(index));
      const optionLeft = document.createElement("div");
      optionLeft.classList.add("option-left");
      const span = document.createElement("span");
      optionLeft.appendChild(span);
      optionDiv.appendChild(optionLeft);
      const p = document.createElement("p");
      p.innerText = option.text;
      optionDiv.appendChild(p);
      container.insertBefore(optionDiv, document.getElementById("submit"));
    });
  }

  let selectedOptionIndex = -1;

  function handleChoice(index) {
    selectedOptionIndex = index;
    const submitButton = document.getElementById("submit");
    submitButton.disabled = false;
    const options = document.querySelectorAll(".option");
    options.forEach((option, i) => {
      if (i === index) {
        option.classList.add("selected");
      } else {
        option.classList.remove("selected");
      }
    });
  }

  document.getElementById("submit").addEventListener("click", async () => {
    const response = await fetch("http://localhost:3000/vote/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ optionIndex: selectedOptionIndex, code: code }),
    });
    if (response.status === 200) {
      alert("Vote submitted successfully");
      window.location.href = "/";
    } else {
      alert("Failed to submit vote");
    }
  });
});
