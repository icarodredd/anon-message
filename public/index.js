document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/getmessages");
    const data = await response.json();
    addMessage(data);
  } catch (error) {
    console.error("Erro ao receber dados do servidor:", error);
  }
});
const addMessage = (data) => {
  document.querySelector(".inbox").insertAdjacentHTML("beforeend", data);
};
