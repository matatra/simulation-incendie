const config = require('./../config');
let createGrid = require('./createGrid');
let burningForest = require('./burningForest');

// Display config infos on the page at the start
window.onload = function() {
    let nbLigneHtml = document.getElementById('nbLines');
    nbLigneHtml.textContent += config.numberLine;
    let nbColHtml = document.getElementById('nbColumns');
    nbColHtml.textContent += config.numberColumn;
    let nbprobaFireHtml = document.getElementById('probaFire');
    nbprobaFireHtml.textContent += config.probaFire * 100 + "%";
};


// Modify the grid to have the right number of column
let grid = document.getElementById('grid');
grid.style.gridTemplateColumns = "repeat("+ config.numberColumn +", 25px [col-start])";


let {listBoxes, forestOnFire} = createGrid(config.numberLine, config.numberColumn);

// Detect the squares clicked to start the fire
let selectSquare = document.querySelectorAll('.square');

selectSquare.forEach(function(select){
    select.addEventListener('click', function(){

        let squareToFind = this.id.split('-');
        forestOnFire.push(listBoxes[squareToFind[0]][squareToFind[1]])

        // Change the square data when selected to burn
        let newBurningSquare = listBoxes[squareToFind[0]][squareToFind[1]];

        newBurningSquare.type = "burning";
        newBurningSquare.isBurning = true;

        let squareToColor = document.getElementById(newBurningSquare.id);
        squareToColor.classList.remove('forest');
        squareToColor.classList.add('burning');

    })
})

let buttonStart = document.getElementById('buttonStart');
buttonStart.addEventListener('click', function(){

    burningForest(listBoxes, forestOnFire);

});
