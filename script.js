function add(a, b) {
    return a + b;	
  };
  
function subtract(a, b) {
    return a - b;
  };
  
function multiply(a, b) {
    return a * b;
  };
  
function divide(a, b) {
    return a / b;
}

function operate(a, oper, b) {
    if (oper === '+') return add(a, b);
    if (oper === '-') return subtract(a, b);
    if (oper === '*') return multiply(a, b);
    if (oper === '/') return divide(a, b);
    return 'Error: invalid operator';
}

console.log(operate(15, '/', 3));