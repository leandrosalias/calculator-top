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

const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".btn-number");

function appendNumber(number) {
    if (operator === null) {
        firstNumber += number;
        display.textContent = firstNumber;
    } else {
        secondNumber += number;
        display.textContent = secondNumber;
    }
}

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        appendNumber(button.textContent);
    });
});