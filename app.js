const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", () => {

  const settings = {
    player: document.getElementById("playerName").value,
    timeControl: document.getElementById("timeControl").value,
    side: document.getElementById("side").value,
    strength: document.getElementById("strength").value,
    variant: document.getElementById("variant").value
  };

  localStorage.setItem("gameSettings", JSON.stringify(settings));

  window.location.href = "game.html";
});
