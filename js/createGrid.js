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
