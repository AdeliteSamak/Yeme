const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
  modal.classList.add("hide");
});

fetch("http://kea-alt-del.dk/t5/api/categories")
  .then(res => res.json())
  .then(createCategories)

function createCategories(data) {
  console.log(data)
  data.forEach(function (oneCat) {
    //create links
    const a = document.createElement("a");
    a.setAttribute("href", `#${oneCat}`);
    a.textContent = oneCat;
    document.querySelector("#wrapper>header>nav").appendChild(a);
    //create sections
    const section = document.createElement("section");
    section.id = oneCat;
    const h2 = document.createElement("h2");
    h2.textContent = oneCat;
    section.appendChild(h2);

    document.querySelector("main").appendChild(section);
  })
  getProducts();
}

function getProducts() {
  fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      showData(data)
    })
}

function showData(jsonData) {
  console.log(jsonData)
  jsonData.forEach(showSingleDish)
}

function showSingleDish(dish) {
  console.log(dish.image)

  //1 grab the template
  const template = document.querySelector("#dishTemplate").content;

  //2 make copy
  const copy = template.cloneNode(true);
  // change some conetnt
  copy.querySelector("h3").textContent = dish.name;
  //append somewhere
copy.querySelector("#image").src = `https://kea-alt-del.dk/t5/site/imgs/medium/${dish.image}-md.jpg`;

  if (dish.discount) { //on sale
    copy.querySelector(".price-discount span").textContent = dish.price;
    const newPrice = Math.round(dish.price - dish.price * dish.discount / 100);

    copy.querySelector(".price-full span").textContent = newPrice;
    //calculate new price
    //49-49*10/100
    //dish.price-dish.price*price.discount/100
  } else { // not on discount
    copy.querySelector(".price-discount").remove()
    copy.querySelector(".price-full span").textContent = dish.price
  }

  copy.querySelector("button").addEventListener("click", () => {
    console.log("click", dish)
    fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
      .then(res => res.json())
      .then(showDetails);
  });

  console.log(`#${dish.category}`)
  document.querySelector(`#${dish.category}`).appendChild(copy);
}

function showDetails(data) {
  console.log(data)
  modal.querySelector(".modal-name").textContent = data.name;
  modal.querySelector(".modal-description").textContent = data.longdescription;
  //...
  modal.classList.remove("hide");
}