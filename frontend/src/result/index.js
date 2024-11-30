Chart.defaults.font.size = 16;
Chart.defaults.color = "#f3f4f6";
document.addEventListener("DOMContentLoaded", () => {
  const code = new URLSearchParams(window.location.search).get("code");

  const chart = new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "# of Votes",
          data: [],
          backgroundColor: "rgba(132, 204, 22, 0.5)",
          hoverBackgroundColor: "rgba(132, 204, 22, 0.8)",
          borderColor: "rgba(132, 204, 22, 1)",
          borderWidth: 1,
          borderRadius: 10,
          indexAxis: "y",
          maxBarThickness: 75,
        },
      ],
    },
  });

  const socket = io(`${API_URL}?code=${code}`);

  socket.on("poll", (pollData) => {
    let { question, options } = pollData;
    document.getElementById("question").innerText = question;
    options = options.sort((a, b) => b.votes - a.votes);
    chart.data.labels = options.map((option) => option.text);
    chart.data.datasets[0].data = options.map((option) => option.votes);
    chart.update();
  });
});
