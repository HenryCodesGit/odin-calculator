
let currDisplayValue = 0;

//Keep track of which values are to be used in an operation
let a = null;
let b = null;
let operation = null;
let lastOperation = null;

const DISPLAY = document.querySelector('.display');

//Gets all the numeric buttons and then add listener to populate the display
const NUMERIC = document.querySelectorAll('button[id^=num]');
NUMERIC.forEach((button) => {
    button.addEventListener('click', ()=>{
        updateValue(parseFloat(button.textContent));
        DISPLAY.textContent = currDisplayValue;
    })
});

//Gets all the operator buttons and then add listener to populate the display
const OPERATORS = document.querySelectorAll('button.operator');
OPERATORS.forEach((button) => {
    button.addEventListener('click', ()=>{


        //If there isn't already an operation, then just queue the values for the next operation
        if(operation == null){ 
            a = currDisplayValue;     
            operation = button.id;  
            currDisplayValue = null; //Set to null so we can type next number
            return;
        }

        //If operation is pressed but a new number has not yet been entered, just change the operation type
        //Also clear 'lastOperation' because now its no longer valid
        if(currDisplayValue == null){
            operation = button.id;  
            lastOperation = null;
            return;
        }

        //If an operation is already queued and if someone entered a value for the
        //Second value then calculate the result
        b = parseFloat(currDisplayValue);
        a = operate(operation,parseFloat(a),parseFloat(b));
        DISPLAY.textContent = a;
        
        //Save the operation that just happened
        lastOperation = operation;

        //After result is calculated, technically we are pressing pressing the button again
        operation = button.id;
        currDisplayValue = null;
    })
});

const ENTER = document.querySelector('#equal');
ENTER.addEventListener('click',()=>enter());

const CLEAR = document.querySelector('#clear');
CLEAR.addEventListener('click',()=>{

    //Keep track of which values are to be used in an operation
    a = null;
    b = null;
    operation = null;
    lastOperation = null;

    currDisplayValue = 0;
    DISPLAY.textContent = currDisplayValue;
});


 /*
 */

function updateValue(value){
    
    switch(currDisplayValue){
        case 0: //Replace leading zeros
        case null: //If DNE, then replace as well
            currDisplayValue = value;
            break;
        case (typeof(currDisplayValue) == 'number') ? currDisplayValue : !currDisplayValue: //Some dumb stuff to do typeof checks with a switch statement
            currDisplayValue = currDisplayValue*10 + value;
            break;
        default:
            //Any other behaviour is not implemented yet
            throw new Error('Value type not yet implemented into this function');
    }
}

function enter(){
    //Initial state -> 'a' is null, operation = null, currentdisplayvalue is 0

    //Next state -> 'a' exists, operation is not null, currentDisplayValue is null
    if(a && operation){
        if(lastOperation && !currDisplayValue){
            a = operate(lastOperation,parseFloat(a),parseFloat(b))
            DISPLAY.textContent = a;
        } else {
            b = parseFloat(currDisplayValue);
            a = operate(operation,parseFloat(a),parseFloat(b));
            DISPLAY.textContent = a;
            
            //Save the operation that just happened
            lastOperation = operation;
            currDisplayValue = null;
        }
    }
    //Next state -> 'a' exists, operation is not null currentDisplayValue is not null ->>> OPERATION HAS OCCURRED


}

function add(a,b){return a+b;}
function subtract(a,b){return a-b;}
const multiply = (a,b) => a*b;
const divide = (a,b) =>  a/b;
function operate(operator,a,b){
    let output = {
        "add":add,
        "subtract":subtract,
        "multiply":multiply,
        "divide":divide,
    };
    return output[operator](a,b);
}