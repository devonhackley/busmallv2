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


