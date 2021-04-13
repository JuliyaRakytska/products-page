const url = 'https://fakestoreapi.com/';
const productUrl = 'products?limit=10';
const categoryUrl = '/category';

let productCard = document.querySelector('.productCard');
let categoryCatalog = document.querySelector('.categoryCatalog');
let productCatalog = document.querySelector('.productCatalog');


async function fetchCatalog () {
    let response = await fetch(`${url}${productUrl}`);
    let data = await response.json();
    return data;
};


async function createCatalog () {
    let htmlCatalog = '';
    let catalog = await fetchCatalog();
    catalog.forEach(({id, title, price, image}) => {
        htmlCatalog += `
        <div class="product-item" id="${id}" >
            <img src=${image}>
            <h3>${title}</h3>
            <span class="price">$ ${price}</span>
            <a href="" class="button">В корзину</a>
        </div>
        `
    }) 
    
    return productCatalog.innerHTML = htmlCatalog;
};
 
createCatalog();

let productItem = document.querySelectorAll('.product-item');
productCatalog.addEventListener("click", showProduct);


async function showProduct (event) {
    let id = event.path[2];

    let response = await fetch(`${url}${productUrl}/${id}`)
    let product = await response.json();
    productCard.innerHTML = `
    <div class="showProduct" id="${id}">
    <img src=${product.image}>
    <div class="productContent">
      <h3>${product.title}</h3>
        <span class="price">$ ${product.price}</span>
        <a href="" class="button" >В корзину</a>
        <p> ${product.description}</p>
        <span> Category: ${product.category}</span>
    </div>
  </div>
    `;
    return productCart;
}

