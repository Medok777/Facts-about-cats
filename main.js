let page = 1;

async function updateButton() {
  const createBtn = document.querySelector(".facts-btn");
  createBtn.addEventListener("click", factsCat);

  factsCat();
}

async function factsCat() {
  const containerCards = document.querySelector(".facts-card");
  const createBtn = document.querySelector(".facts-btn");

  try {
    createBtn.disabled = true;
    createBtn.textContent = "Loading...";
    containerCards.innerHTML = "";

    const API_URL = `https://catfact.ninja/facts?max_length=250&limit=5&page=${page}`;

    const responseApi = await fetch(API_URL);
    const apiData = await responseApi.json();

    if (responseApi.status === 404) {
      console.error("Ошибка сервера: 404");
    }

    apiData.data.forEach((fact, index) => {
      const createCard = document.createElement("div");
      createCard.classList.add("card");

      createCard.innerHTML = `
       <p class="number-card">${index + 1}</p>
       <p class="card-text">${fact.fact}</p>
       <em class="length-text">${fact.length + " Letters"}</em>
    `;

      containerCards.appendChild(createCard);
    });

    page < 64 ? page++ : (page = 1);

    console.log(apiData, "data");
  } catch (error) {
    console.error(error);
  } finally {
    createBtn.disabled = false;
    createBtn.textContent = "New facts";
  }
}

updateButton();
