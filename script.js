function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let displayValue = "";
let previousValue = "";
let activeOperator = null;
let needScreenReset = false;

// Get DOM elements
const previousDisplay = document.getElementById("previousDisplay");
const currentDisplay = document.getElementById("currentDisplay");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.getElementById("equalsKey");
const clearButton = document.getElementById("clearKey");
const deleteButton = document.getElementById("deleteKey");
const pointButton = document.getElementById("decimalKey");

// Add event listeners
numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => setOperation(button.textContent));
});

equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);

// Add keyboard support - add this after your existing event listeners
document.addEventListener("keydown", handleKeyboardInput);

function handleKeyboardInput(e) {
  // Numbers 0-9
  if (e.key >= 0 && e.key <= 9) {
    appendNumber(e.key);
  }
  // Operators
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    const operatorMap = {
      "+": "+",
      "-": "−", // Using the same symbol as in your HTML
      "*": "×",
      "/": "÷"
    };
    setOperation(operatorMap[e.key]);
  }
  // Enter or = for equals
  if (e.key === "Enter" || e.key === "=") {
    e.preventDefault(); // Prevent form submission
    evaluate();
  }
  // Backspace for delete
  if (e.key === "Backspace") {
    deleteNumber();
  }
  // Escape or Delete for clear
  if (e.key === "Escape" || e.key === "Delete") {
    clear();
  }
  // Decimal point
  if (e.key === ".") {
    appendPoint();
  }
}

function appendNumber(number) {
  if (currentDisplay.textContent === "0" || needScreenReset) {
    resetScreen();
  }
  currentDisplay.textContent += number;
}

function resetScreen() {
  currentDisplay.textContent = "";
  needScreenReset = false;
}

function clear() {
  currentDisplay.textContent = "0";
  previousDisplay.textContent = "";
  displayValue = "";
  previousValue = "";
  activeOperator = null;
}

function deleteNumber() {
  currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
  if (currentDisplay.textContent === "") {
    currentDisplay.textContent = "0";
  }
}

function appendPoint() {
  if (needScreenReset) resetScreen();
  if (currentDisplay.textContent === "") currentDisplay.textContent = "0";
  if (currentDisplay.textContent.includes(".")) return;
  currentDisplay.textContent += ".";
}

function setOperation(operator) {
  if (activeOperator !== null) evaluate();
  displayValue = currentDisplay.textContent;
  activeOperator = operator;
  previousDisplay.textContent = `${displayValue} ${activeOperator}`;
  needScreenReset = true;
}

function evaluate() {
  if (activeOperator === null || needScreenReset) return;
  if (activeOperator === "÷" && currentDisplay.textContent === "0") {
    alert("Cannot divide by zero!");
    return;
  }
  previousValue = currentDisplay.textContent;
  currentDisplay.textContent = roundResult(
    operate(activeOperator, displayValue, previousValue)
  );
  previousDisplay.textContent = `${displayValue} ${activeOperator} ${previousValue} =`;
  activeOperator = null;
}

function roundResult(number) {
  return Math.round(number * 1000000) / 1000000;
}
// Fix typo in operate function
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "−":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}

document.getElementById('currentYear').textContent = new Date().getFullYear();

