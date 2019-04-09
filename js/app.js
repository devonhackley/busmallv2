'use strict';

const products = [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
    'wine-glass.jpg'
];
const productArray = [];
var userClicks = 0;
let clickLimit = 25;
const imgElments = document.getElementsByClassName('product');
var prevProducts = [];

const Product = function(path){
    this.filePath = `img/${path}`;
    this.name = path.split('.')[0];
    this.views = 0;
    this.vote = 0;
    productArray.push(this);
};

function randomNumGen() {
    return Math.floor(Math.random() * productArray.length);
}

products.forEach(product => {
    new Product(product);
});


function showRandProduct(event){
    const productIndexes = [];
    const productsToBeSeen = []; // This holds the products that gets rendered to the dom
    userClicks++;
    if (event) {
        var clickedProduct = event.target.alt;
        productArray.forEach(prod => {
            if (prod.name === clickedProduct) { // upvote the clicked product
                prod.vote++;
            }
        });
    }

    for (let i = 0; i < imgElments.length; i++) {
        let random = randomNumGen();
        // Check to make sure that no duplicates will be displayed
        while (productIndexes.indexOf(random) !== -1 || prevProducts.indexOf(random) !== -1) {
            random = randomNumGen();
        }
        productIndexes[i] = random;
    }
    prevProducts = productIndexes;

    productIndexes.forEach((item, index) => { // increment display views
        productsToBeSeen[index] = productArray[item];
        productArray[item].views++;
    });

    for (let i = 0; i < imgElments.length; i++){ // render products
        imgElments[i].src = productsToBeSeen[i].filePath;
        imgElments[i].alt = productsToBeSeen[i].name;
        imgElments[i].title = productsToBeSeen[i].name;
    }

    if (userClicks >= clickLimit) { // no more clicks allowed
        for (var i = 0; i < imgElments.length; i++) {
            imgElments[i].removeEventListener('click', showRandProduct);
        }
        var userResults = document.getElementById('product-results');
        var ul = document.createElement('ul');
        userResults.appendChild(ul);
        productArray.forEach((product) => {
            const current = product;
            var li = document.createElement('li');
            var info = '';
            current.views === 0 ?
                info += `0 votes for ${current.name}`:
                info += `${current.vote} votes for ${current.name}`;
            li.innerText = info;
            ul.appendChild(li);
        });
    }
}

showRandProduct();
userClicks--; // decrement the user clickes.

for (var i = 0; i < imgElments.length; i++){
    imgElments[i].addEventListener('click', showRandProduct);
}
