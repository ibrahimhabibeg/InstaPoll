document.querySelectorAll("textarea").forEach(function (textarea) {
  textarea.style.height = textarea.scrollHeight + "px";
  textarea.style.overflowY = "hidden";

  textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
});

document.addEventListener("DOMContentLoaded", async function () {
  const code = localStorage.getItem("code");
  if (code) {
    const response = await fetch(
      `${API_URL}/pollExists/?code=${code}`
    );
    const data = await response.json();
    if (!data.used) {
      localStorage.removeItem("code");
      localStorage.removeItem("token");
      if (
        window.location.pathname === "/share" ||
        window.location.pathname === "/edit"
      ) {
        window.location.href = "/";
      }
    }
  }
});
