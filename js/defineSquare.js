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
