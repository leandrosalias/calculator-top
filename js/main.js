let firstNumber = '';
let operator = null;
let secondNumber = '';

function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { 
  if (b === 0) return "¡Error! Can't divide by zero";
  return a / b; 
}

function operate(op, a, b) {
  a = Number(a);
  b = Number(b);
  switch (op) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return null;
  }
}

let shouldResetFirstNumber = false;

const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".btn-number");
const operatorButtons = document.querySelectorAll(".btn-operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#decimal");
const deleteButton = document.querySelector("#delete");

// Used to round long decimals
function roundResult(number) {
    if (typeof number === "string") return number; // Case of returning the divide by 0 message
    return Math.round(number * 1000) / 1000;
}

function appendNumber(number) {
    if (operator === null) {
        // If "=" was pressed and a number is pressed next, then reset first number
        if (shouldResetFirstNumber) {
            firstNumber = "";
            shouldResetFirstNumber = false;
        }
        firstNumber += number;
        display.textContent = firstNumber;
    } else {
        secondNumber += number;
        display.textContent = secondNumber;
    }
}

function setOperator(newOperator) {
    if (firstNumber === "") return; // If user presses an operator without writing a number before

    // If secondNumber was entered (ex: 12 + 7 and presses "-"), calculate first
    if (secondNumber !== "") {
        evaluate();
    }

    operator = newOperator;
    shouldResetFirstNumber = false;
}

function evaluate() {
    // Calculate only if we have the 3 parts of the operation
    if (firstNumber === "" || operator === null || secondNumber === "") return;

    let result = operate(operator, firstNumber, secondNumber);
    result = roundResult(result);

    display.textContent = result;

    // If division by zero, reset variables
    if (typeof result === "string")
        firstNumber = "";
    else
        firstNumber = String(result);

    secondNumber = "";
    operator = null;
    shouldResetFirstNumber = true;
}

function clearCalculator() {
    firstNumber = "";
    operator = null;
    secondNumber = "";
    shouldResetFirstNumber = false;
    display.textContent = "0";
}

// Decimal functionality
function appendDecimal() {
    if (operator === null) {
        if (shouldResetFirstNumber) {
            firstNumber = "0";
            shouldResetFirstNumber = false;
        }
        if (firstNumber === "") firstNumber = "0";
        if (firstNumber.includes(".")) return;

        firstNumber += ".";
        display.textContent = firstNumber;
    } else {
        if (secondNumber === "") secondNumber = "0";
        if (secondNumber.includes(".")) return;

        secondNumber += ".";
        display.textContent = secondNumber;
    }
}

// Backspace button functionality
function deleteNumber() {
    if (operator === null) {
        if (shouldResetFirstNumber) return;
        firstNumber = firstNumber.slice(0, -1);
        display.textContent = firstNumber || "0";
    } else {
        secondNumber = secondNumber.slice(0, -1);
        display.textContent = secondNumber || "0";
    }
}

// Keyboard support
function handleKeyboardInput(e) {
    if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
    if (e.key === ".") appendDecimal();
    if (e.key === "=" || e.key === "Enter") {
        e.preventDefault(); // Pressing enter doesn't press the last button highlighted by HTML
        evaluate();
    }
    if (e.key === "Backspace") deleteNumber();
    if (e.key === "Escape") clearCalculator();
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        setOperator(e.key);
    }
}

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        appendNumber(button.textContent);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        setOperator(button.dataset.operator);
    });
});

equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clearCalculator);
decimalButton.addEventListener("click", appendDecimal);
deleteButton.addEventListener("click", deleteNumber);
window.addEventListener("keydown", handleKeyboardInput);