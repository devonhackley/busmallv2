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
    'sweep.jpg',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
    'wine-glass.jpg'
];
const productArray = [];
let userClicks = 0;
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

    productIndexes.forEach((item, index) => {
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
