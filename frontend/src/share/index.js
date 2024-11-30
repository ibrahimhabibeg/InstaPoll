document.addEventListener("DOMContentLoaded", async function () {
  new QRCode(document.getElementById("qrcode"), {
    text: `${window.location.origin}/vote/?code=${localStorage.getItem(
      "code"
    )}`,
    colorDark: "#000000",
    colorLight: "#f9fafb",
    correctLevel: QRCode.CorrectLevel.H,
    height: 200,
    width: 200,
  });

  const code = localStorage.getItem("code");
  document.getElementById("code").textContent = code;
});
