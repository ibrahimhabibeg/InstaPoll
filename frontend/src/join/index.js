const inputs = document.getElementById("inputs");

inputs.addEventListener("focusin", function (e) {
  const input = Array.from(inputs.children).find((input) => input.value === "");
  if (input) {
    input.focus();
  } else {
    inputs.lastElementChild.focus();
  }
});

inputs.addEventListener("input", function (e) {
  const target = e.target;
  const val = target.value;
  const reg = new RegExp("^[0-9]$");

  if (!reg.test(val)) {
    target.value = "";
    return;
  }

  if (val != "") {
    const next = target.nextElementSibling;
    if (next) {
      next.focus();
    } else {
      const code = Array.from(inputs.children)
        .map((input) => input.value)
        .join("");
      localStorage.setItem("code", code);
      window.location.href = `/vote/?code=${code}`;
    }
  }
});

inputs.addEventListener("keyup", function (e) {
  const target = e.target;
  const key = e.key.toLowerCase();

  if (key == "backspace" || key == "delete") {
    const prev = target.previousElementSibling;
    if (prev) {
      prev.value = "";
      prev.focus();
    }
  }
});
