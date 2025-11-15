let container = document.querySelector("#container");
let form = document.querySelector("#form");
let submitBtn = document.querySelector("#submitBtn");

let title = document.querySelector("#title");
let price = document.querySelector("#price");
let image = document.querySelector("#image");

let titleError = document.querySelector("#titleError");
let priceError = document.querySelector("#priceError");
let imageError = document.querySelector("#imageError");

let toast = document.querySelector("#toast");

function showToast(message) {
  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}

function validate() {
  let valid = true;

  titleError.textContent = "";
  priceError.textContent = "";
  imageError.textContent = "";

  if (title.value.trim().length < 3) {
    titleError.textContent = "Минимум 3 символа";
    valid = false;
  }

  if (Number(price.value) <= 0 || price.value === "") {
    priceError.textContent = "Цена должна быть положительным числом";
    valid = false;
  }

  const urlRegex = /^(https?:\/\/)[^\s]+$/;
  if (!urlRegex.test(image.value)) {
    imageError.textContent = "Введите валидный URL";
    valid = false;
  }

  return valid;
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (!validate()) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Отправка...";

  const newData = {
    title: title.value,
    price: Number(price.value),
    image: image.value,
  };

  try {
    await fetch("https://fakestoreapi.com/products/", {
      method: "POST",
      body: JSON.stringify(newData),
    });

    showToast("Добавлено");

    form.reset();
  } catch (err) {
    console.log(err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Отправить";
  }
});

fetch("https://fakestoreapi.com/products/")
  .then((response) => response.json())
  .then((data) => {
    container.innerHTML = data
      .map((item) => {
        return `<div>${item.price}
         <img src="${item.image}" alt="" />
          ${item.rating.rate} ★ 
           (${item.rating.count})</div>`;
      })
      .join("");
  });
