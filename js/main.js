const url = 'https://fakestoreapi.com/';
const productUrl = 'products';
const categoryUrl = '/category';


let productCard = document.querySelector('.productCard');
let categoryCatalog = document.querySelector('.categoryCatalog');
let productCatalog = document.querySelector('.productCatalog');

productCatalog.addEventListener("click", showProduct);
productCard.addEventListener("click", showCategory);
categoryCatalog.addEventListener("click", showProduct);


// создание каталога на 10 позиций
async function createCatalog () {
    let htmlCatalog = '';
    let response = await fetch(`${url}${productUrl}?limit=10`);
    let catalog = await response.json(); 
    catalog.forEach(({id, title, price, image}) => {
        htmlCatalog += `
        <div class="product-item" data-id="${id}" >
            <img src=${image}>
            <h3>${title}</h3>
            <span class="price">$ ${price}</span>
            <a  class="button">В корзину</a>
        </div>
        `
    }) 
    return productCatalog.innerHTML = htmlCatalog;
};
 
createCatalog();

// функция для показа выбранного товара
async function showProduct (event) {
    let id = event.target.closest('.product-item')?.dataset?.id;
    try {
        if(!id) {
            return;
        } else {
            let response = await fetch(`${url}${productUrl}/${id}`)
            let {image, title, price, description, category} = await response.json();
            productCard.innerHTML = `
            <div class="showProduct" data-id="${id}">
            <img src=${image}>
            <div class="productContent" >
                <h3>${title}</h3>
                <span class="price">$ ${price}</span>
                <a href="" class="button" >В корзину</a>
                <p> ${description}</p>
                <a  class="${category}">Category: ${category}</a>
            </div>
          </div>
            `;
            return productCard;
        }
        
    }
    catch(error) {
        throw new Error ('Failed to load product');
    }
}

// функция для показа катагории товаров
async function showCategory (event) {
    let category= event.target;
    let htmlCatalog ="";
    try {
        if (category.className != "price") {
            let response = await fetch(`${url}${productUrl}${categoryUrl}/${category.className}`);
            let catalog = await response.json();
            catalog.forEach(({id, title, price, image}) => {
            htmlCatalog += `
            <div class="product-item" data-id="${id}" >
                <img src=${image}>
                <h3>${title}</h3>
                <span class="price">$ ${price}</span>
                <a  class="button">В корзину</a>
            </div>
            `
        }) 
        return categoryCatalog.innerHTML = htmlCatalog;    
        } else {
            return;
        }
    }
    catch(error) {
        throw new Error ('Failed to load category');
    };
} 

