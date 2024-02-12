(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
    numberLine: 20,
    numberColumn: 20,

    // between 0 and 1
    probaFire: 0.5,

    // Initial fire should be register as '[lineValue]-[columnValue]' and between 0 and number-1 
    initialFire: ['0-0']
};
},{}],2:[function(require,module,exports){
const config = require('./../config');
let defineSquare = require('./defineSquare');

let count = 0;

async function burningForest(listBoxes, forestOnFire){

    while(forestOnFire.length > 0){

        // return the list of square that can burn, and return the updated list of all boxes
        let squareTotoLook = defineSquare(listBoxes, forestOnFire);
        
        let newForestOnFire = [];

        // Define if each square adjacent to burning square goes on fire
        squareTotoLook.forEach(function(element){
            let rdm = Math.random();
            // Must not be burning, ashes, or undefined (border of the grid)
            if(typeof element != 'undefined' && rdm < config.probaFire && element.type != 'ashes' && !element.isBurning){
                let square= element.id.split('-');
                let sqrLine = parseInt(square[0]);
                let sqrCol = parseInt(square[1]);
                let newBurningSquare = listBoxes[sqrLine][sqrCol];

                // Transform the square data in listBox
                newBurningSquare.type = "burning";
                newBurningSquare.isBurning = true;
                newForestOnFire.push(newBurningSquare);

                // Display the new square burning on the gride
                let squareToColor = document.getElementById(element.id);
                squareToColor.classList.remove('forest');
                squareToColor.classList.add('burning');

            }
        })

        // Empty squareToLook, to ot look square that already turn to ashes
        squareTotoLook = [];
        // Set new list of forest on fire
        forestOnFire = newForestOnFire;
        count += 1;
        let stepValueHtml = document.getElementById('stepValue');
        stepValueHtml.textContent = count;

        await sleep(2000);

    }

    let stepHtml = document.getElementById('step');
    stepHtml.textContent = 'Feu éteint en ' + count + ' étapes';
    let stepValueHtml = document.getElementById('stepValue');
    stepValueHtml.textContent = ''

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = burningForest;
},{"./../config":1,"./defineSquare":4}],3:[function(require,module,exports){
const config = require('./../config');

function createGrid(nbLine, nbColumn){

    let listBoxes = [];

    // Crée les carrées a afficher dans la grid + crée les objet relatif au carré, avec les infos necessaires 
    for (let i = 0; i < nbLine; i++) {

        let listColumn = [];
        
        for(let j = 0; j < nbColumn; j++) {

            let boxeId = i + '-' + j;
            
            let square = document.createElement('div');
            square.classList.add('square', 'forest');
            square.id = boxeId; 
            grid.appendChild(square);

            listColumn[j] = {
                id: boxeId,
                type: "forest",
                isBurning: false
            };
        }
        listBoxes.push(listColumn);
    }

    let forestOnFire = [];

    config.initialFire.forEach(function(element){
        let squareBurning = element.split('-');

        // Change the square data when selected to burn
        let newBurningSquare = listBoxes[squareBurning[0]][squareBurning[1]];
        forestOnFire.push(newBurningSquare);

        newBurningSquare.type = "burning";
        newBurningSquare.isBurning = true;

        let squareToColor = document.getElementById(newBurningSquare.id);
        squareToColor.classList.remove('forest');
        squareToColor.classList.add('burning');

    })
    return {listBoxes, forestOnFire};
}

module.exports = createGrid;

},{"./../config":1}],4:[function(require,module,exports){
const config = require('./../config');

function defineSquare(listBoxes, forestOnFire){
    let squareTotoLook = [];

    // Define on wich square a new fire is possible
    forestOnFire.forEach(function(element){
        // Catch the position of each square to look for adjacent square
        let square= element.id.split('-');
        let sqrLine = parseInt(square[0]);
        let sqrCol = parseInt(square[1]);

        // To avoid undefined value to be pushed inside the list
        if(sqrLine-1 >= 0){
            squareTotoLook.push(listBoxes[sqrLine-1][sqrCol])
        }

        if(sqrLine+1 < config.numberLine){
            squareTotoLook.push(listBoxes[sqrLine+1][sqrCol])
        }

        if(sqrCol-1 >= 0){
            squareTotoLook.push(listBoxes[sqrLine][sqrCol-1])
        }

        if(sqrCol+1 < config.numberColumn){
            squareTotoLook.push(listBoxes[sqrLine][sqrCol+1])
        }
        
        // square burned get color to ashes
        let squareToColor = document.getElementById(element.id);
        squareToColor.classList.remove('burning');
        squareToColor.classList.add('ashes');
    })

    return squareTotoLook;
}

module.exports = defineSquare;






        // squareTotoLook.push(listBoxes[sqrCol][sqrLine-1], listBoxes[sqrCol][sqrLine+1], listBoxes[sqrCol-1][sqrLine], listBoxes[sqrCol+1][sqrLine]);
},{"./../config":1}],5:[function(require,module,exports){
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

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function burningForest(listBoxes, forestOnFire){

//     while(forestOnFire.length > 0){

//         // return the list of square that can burn, and return the updated list of all boxes
//         let squareTotoLook = defineSquare(listBoxes, forestOnFire);
        
//         let newForestOnFire = []

//         // Define if each square adjacent to burning square goes on fire
//         squareTotoLook.forEach(function(element){
//             let rdm = Math.random();
//             // Must not be burning, ashes, or undefined (border of the grid)
//             if(typeof element != 'undefined' && rdm < config.probaFire && element.type != 'ashes' && !element.isBurning){
//                 let square= element.id.split('-');
//                 let sqrLine = parseInt(square[0]);
//                 let sqrCol = parseInt(square[1]);
//                 let newBurningSquare = listBoxes[sqrLine][sqrCol];

//                 // Transform the square data in listBox
//                 newBurningSquare.type = "burning";
//                 newBurningSquare.isBurning = true;
//                 newForestOnFire.push(newBurningSquare);

//                 // Display the new square burning on the gride
//                 let squareToColor = document.getElementById(element.id);
//                 squareToColor.classList.remove('forest');
//                 squareToColor.classList.add('burning');

//             }
//         })

//         // Empty squareToLook, to ot look square that already turn to ashes
//         squareTotoLook = [];
//         // Set new list of forest on fire
//         forestOnFire = newForestOnFire
//         count += 1;
//         let stepValueHtml = document.getElementById('stepValue');
//         stepValueHtml.textContent = count;

//         await sleep(2000);

//     }

//     let stepHtml = document.getElementById('step');
//     stepHtml.textContent = 'Feu éteint en ' + count + ' étapes'
//     let stepValueHtml = document.getElementById('stepValue');
//     stepValueHtml.textContent = ''
// }
},{"./../config":1,"./burningForest":2,"./createGrid":3}]},{},[5]);
