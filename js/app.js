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
var productArray = [];
var userClicks = 0;
let clickLimit = 25;
const imgElments = document.getElementsByClassName('product');
var prevProducts = [];
const productTitles = [];
var userVotes = [];
let chart; // eslint-disable-line

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

function handleEventListener(handle){
    for (var i = 0; i < imgElments.length; i++) {
        handle === 'add' ?
            imgElments[i].addEventListener('click', handleUserClick) :
            imgElments[i].removeEventListener('click', handleUserClick);
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
    console.log('userVotes', userVotes);
    var ctx = document.getElementById('product-chart').getContext('2d');
    chart = new Chart(ctx, { // eslint-disable-line
        type: 'bar',
        data: {
            labels:productTitles,
            datasets: [{
                label: '# of User Votes',
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
            yAxes: [
                {
                    ticks: {
                        stepSize: 1.0
                    }
                }]
        }
    });
}

function updateProductCount(product){
    productArray.forEach((prod, index) => {
        if (prod.name === product) { // upvote the clicked product
            prod.vote++;
            userVotes[index] += prod.vote;
        }
        if(!productTitles.includes(prod.name)){
            productTitles[index] = prod.name;
        }
    });
}
function updateLocalStorage() {
    localStorage['userVotes'] = JSON.stringify(userVotes);
}

function handleUserClick(event){
    userClicks++;
    updateProductCount(event.target.alt);
    if (userClicks >= clickLimit) { // no more clicks allowed
        chartResults();
        updateLocalStorage();
    }
    showRandProduct();
}


function showRandProduct(){
    const productIndexes = [];
    const productsToBeSeen = []; // This holds the products that gets rendered to the dom

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
}

// check if local storage exists, handle accordingly
if(localStorage['allProducts'] && localStorage['userVotes']) {
    productArray = JSON.parse(localStorage['allProducts']);
    userVotes = JSON.parse(localStorage['userVotes']);
} else {
    products.forEach(product => {
        new Product(product);
    });
    userVotes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    localStorage['allProducts'] = JSON.stringify(productArray);
}

showRandProduct();
userClicks--; // decrement the user clickes.
handleEventListener('add');
