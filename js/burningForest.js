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