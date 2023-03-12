const form = document.querySelector("form");
const input = document.querySelector("#search");
const loader = document.querySelector(".loader");
const ul = document.querySelector(".list-group");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const request = input.value.trim().replace(/\s/g, "/");

  if (!request) {
    createMessage("Пожалуйста, введите запрос");
    return;
  }

  loader.hidden = false;

  const response = await fetch(
    `https://api.github.com/search/repositories?q=${request}`
  );

  if (response.ok) {
    const res = await response.json();
    let result = "";
    console.log(res);
    if (res.total_count === 0) {
      input.value = "";
      loader.hidden = true;
      createMessage("По вашему запросу ничего не найдено");
      return;
    }

    for (const key in res["items"]) {
      if (key <= 10) {
        let items = res["items"][key];
        result += `<li class="list-group-item">
           <a target="_blank" href="${items.clone_url}">${items.name}</a>
           <p>${items.description}</p>
         </li>`;
      }
    }

    loader.hidden = true;
    ul.innerHTML = result;
  } else {
    createMessage("Произошла ошибка при запросе");
    input.value = "";
    loader.hidden = true;
  }
});

function createMessage(text) {
  ul.innerHTML = text;
}
