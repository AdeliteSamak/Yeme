const containerForArticles = document.querySelector("#articles")
const navigation = document.querySelector("#nav")

fetch("http://kea-alt-del.dk/t5/api/categories")
  .then(res => res.json())
  .then((categories)=> {
    categories.forEach(category => {
        containerForArticles.innerHTML += `
            <section id=${category} class="section-category">
             <h2>${category}</h2>
            </section>
        `
        navigation.innerHTML += `
            <a href="#${category}">${category}</a>        
        `
    });
});

function getArticles() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        createArticles(data)
    })
}
function createArticles(dataArticles) {
    console.log(dataArticles)

    dataArticles.forEach(singleDish => {
        document.querySelector(`#${singleDish.category}`).innerHTML += 
        `<article class="course">
            <header>
                <h3>${singleDish.name}</h3>
                <p class="soldout">Sold Out!</p>
                <div class="image">
                    ${ singleDish.vegetarian == true ? 
                        `<img class="vegetarian" src="visual/vegetarian.png" alt="vegetarian" />` : 
                        ''
                    }
                    <img id="image" src="https://kea-alt-del.dk/t5/site/imgs/medium/${singleDish.image}-md.jpg" alt="${singleDish.name}" />
                </div>

                <p class="price price-full"><span>${singleDish.price}</span>,-</p>

                ${ singleDish.discount > 0 ? 
                        `<p class="price price-discount"><span>${singleDish.price-singleDish.discount}</span>,-</p>` : 
                        ''
                }
                

            </header>
            <section class="info">
                <p>
                    ${singleDish.shortdescription}
                </p>
                <p class="long-description" id="description${singleDish.id}"></p>
                <button onclick="readMore(event)" data-id="${singleDish.id}">Read More</button>
            </section>
        </article>`
    });
}

function readMore(event) {
    const id = event.target.dataset.id;
    console.log(event.target.dataset.id)
    if (event.target.textContent == "Read less") {
        document.querySelector(`#description${id}`).innerHTML = "";
        event.target.textContent = "Read more";
    }
    else {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${id}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (product) {
            console.log(product)
            document.querySelector(`#description${id}`).innerHTML = product.longdescription;
            event.target.textContent = "Read less"
            
        })
    }
}

getArticles()
