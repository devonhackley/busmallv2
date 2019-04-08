'use strict';
const products = [
    'bag',
    'banana',
    'bathroom',
    'boots',
    'breakfast',
    'bubblegum',
    'chair',
    'cthulhu',
    'dog-duck',
    'dragon',
    'pen',
    'pet-sweep',
    'scissors',
    'shark',
    'sweep',
    'tauntaun',
    'unicorn',
    'usb',
    'water-can',
    'wine-glass'
];
const productArray = [];
let userClicks = 0;
let clickLimit = 25;
const imgElments = document.getElementsByClassName('product');
var prevProducts = [];

const Product = function(name){
    this.filePath = `img/${name}.jpg`;
    this.name = name;
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


function showRandProduct(){
    const productIndexes = [];
    const productsToBeSeen = [];
    for (let i = 0; i < imgElments.length; i++) {
        let random = randomNumGen();
        while (productIndexes.indexOf(random) !== -1 || prevProducts.indexOf(random) !== -1) {
            random = randomNumGen();
        }
        productIndexes[i] = random;
    }
    prevProducts = productIndexes;

    prevProducts.forEach((item, index) => {
        productsToBeSeen[index] = productArray[item];
        productArray[item].views++;
    });

    for (let i = 0; i < imgElments.length; i++){
        imgElments[i].src = productsToBeSeen[i].filePath;
        imgElments[i].alt = productsToBeSeen[i].name;
        imgElments[i].title = productsToBeSeen[i].name;
    }
}

showRandProduct();
