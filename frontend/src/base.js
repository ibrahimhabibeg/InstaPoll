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
  let isValidCode = false;
  const pathname = window.location.pathname.split("/")[1];
  if (code) {
    const response = await fetch(`${API_URL}/pollExists/?code=${code}`);
    const data = await response.json();
    isValidCode = data.used;
  }
  if (!isValidCode) {
    localStorage.removeItem("code");
    localStorage.removeItem("token");

    if (pathname === "share" || pathname === "edit") {
      window.location.href = "/";
    }
  }
  const token = localStorage.getItem("token");
  if (!token && pathname === "edit") {
    window.location.href = "/";
  }
});
