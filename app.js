'use strict';

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
    var random = Math.floor(Math.random() * productArray.length);
    return random;
}

