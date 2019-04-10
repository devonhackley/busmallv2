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
const productTitles = [];
const userVotes = [];
let chart;

const Product = function(path){
    this.filePath = `img/${path}`;
    this.name = path.split('.')[0];
    this.views = 0;
    this.vote = 0;
    productArray.push(this);
    productTitles.push(this.name);
};

function randomNumGen() {
    return Math.floor(Math.random() * productArray.length);
}

products.forEach(product => {
    new Product(product);
});

function handleEventListener(handle){
    for (var i = 0; i < imgElments.length; i++) {
        handle === 'add' ?
            imgElments[i].addEventListener('click', showRandProduct) :
            imgElments[i].removeEventListener('click', showRandProduct);
    }
}

function showResults(){ // eslint-disable-line
    handleEventListener('remove');
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

function chartResults() {
    handleEventListener('remove');
    var ctx = document.getElementById('product-chart').getContext('2d');
    chart = new Chart(ctx, { // eslint-disable-line
        type: 'bar',
        data: {
            labels:productTitles,
            datasets: [{
                label: 'User Votes',
                data: userVotes,
                backgroundColor: '#ff33bb',
                borderColor: '#000000',
                borderWidth: 2,
                hoverBackgroundColor:'#eeff56'
            }]
        },
        options: {
            responsive: false,
            animation: {
                duration: 1000,
                easing: 'easeOutBounce'
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 10,
                    min: 0,
                    scaleOverride:true,
                    scaleSteps:1,
                    scaleStartValue:0,
                    scaleStepWidth:10
                }
            }]
        }
    });
}


function showRandProduct(event){
    const productIndexes = [];
    const productsToBeSeen = []; // This holds the products that gets rendered to the dom
    userClicks++;
    if (event) {
        var clickedProduct = event.target.alt;
        productArray.forEach(prod => {
            if (prod.name === clickedProduct) { // upvote the clicked product
                prod.vote++;
                userVotes.push(prod.vote);
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
        // showResults();
        chartResults();
    }
}

showRandProduct();
userClicks--; // decrement the user clickes.
handleEventListener('add');
