// Wait for DOM to finish loading before running the game
// Get the button  element and add event listeners 

document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons){
        button.addEventListener('click', function(){
            if(this.getAttribute("data-type") === "submit"){
               checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        } )
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event){
        if (event.key === "Enter"){
            checkAnswer();
        }
    })

    runGame("addition");
})

/** 
 * The main game "loop", called when the scrip is first loaded
 * and after the user's answer has been processed
*/
function runGame(gameType){

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    // Creates two random numbers betwen 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType ===  "addition"){
        displayAdditionQuestion(num1, num2);
    } else if(gameType === "multiply"){
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract"){
        displaySubtractQuestion(num1, num2);
    } else {
        alert(`Unkown game type ${gameType}`);
        throw `Unkown  game type ${gameType}. Aborting!`;
    }
    
}

/**
 * Check  the  answer  against the  first element  in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer(){

    let userAnswer  = parseInt(document.getElementById('answer-box').value);
    let calculateAnswer = calculateCorrectAnswer();
    let  isCorrect = userAnswer === calculateAnswer[0];

    if (isCorrect){
        alert("Hey! you got it right!:D")
        incrementScore();
    }  else{
        alert(`Awww... you answered ${userAnswer}.The correct answer was ${calculateAnswer[0]}! `);
        incrementWrongAnswer();
    }

    runGame(calculateAnswer[1]);
}

/**
 * Gets the operands (the numbers)and the  operator (puls, minus, etc)
 * directly fromthe dom, and returns the correct answer
 */
function calculateCorrectAnswer(){

    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator  === "+"){
        return [operand1 + operand2, "addition"];
    } else if (operator  === "x"){
        return [operand1  * operand2, "multiply"];
    } else if (operator === "-"){
        return [operand1 - operand2, "subtract"];
    }  else{
        alert(`Uniplemented operator ${operator}`);
        throw  `Uniplemented operator ${operator}`;
    }
}

/**
 * Gets the currently score from the DOM and increments it by 1
 */
function incrementScore(){

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore; 
}

/**
 * Gets the currently tally of incorrect answers from  the DOM and increments it by 1
 */
function incrementWrongAnswer(){

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore; 

}


function displayAdditionQuestion(operand1, operand2){

    document.getElementById('operand1').textContent =  operand1;
    document.getElementById('operand2').textContent =  operand2;
    document.getElementById('operator').textContent =  "+";

}

function displaySubtractQuestion(operand1, operand2){

    document.getElementById("operand1").textContent =  operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent =  operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent =  "-";
}


function displayMultiplyQuestion(operand1, operand2){

    document.getElementById('operand1').textContent =  operand1;
    document.getElementById('operand2').textContent =  operand2;
    document.getElementById('operator').textContent =  "x";
}
     