function add(a, b) {
    return a + b;	
    resetOperatorCount();
  };
  
function subtract(a, b) {
    return a - b;
    resetOperatorCount();
  };
  
function multiply(a, b) {
    return a * b;
    resetOperatorCount();
  };
  
function divide(a, b) {
    return a / b;
    resetOperatorCount();
}

function operate(a, oper, b) {
    if (oper === '+') return add(a, b);
    if (oper === '-') return subtract(a, b);
    if (oper === '*') return multiply(a, b);
    if (oper === '/') return divide(a, b);
    return 'Error: invalid operator';
}

const display = document.querySelector('.display');
let num1 = 0;
let num2 = 0;
let operator = '';
let operatorCount = 0;

document.querySelectorAll('button').forEach(item => {
  item.addEventListener('click', event => {
    switch(item.textContent) {
      case 'C': clear(); break;
      case '←': backspace(); break;
      case '00': if(display.textContent[0] !== '0') display.textContent += item.textContent; break; 
      default: if(isFinite(item.textContent)) {
                  display.textContent[0] === '0' ?
                    display.textContent = item.textContent :
                    display.textContent += item.textContent; 
                } else if (isOperator && operatorCount === 0) {
                  ++operatorCount;
                  display.textContent += item.textContent;                  
                }
    };
    resizeFont();
  });
});

window.addEventListener("keydown", function (event) {
  // if (event.defaultPrevented) {
  //   return; // Do nothing if the event was already processed
  // }
  
  switch(event.key) {
    case 'Backspace': backspace(); break;
    case 'Escape': 
      document.querySelector('.clear').classList.toggle('active'); 
      clear(); 
      break;
    default:
      if(isFinite(event.key)) {
        digitButton = document.querySelector(`.button-${event.key}`);
        digitButton.click();
        digitButton.classList.toggle('active');
      } else if(isOperator(event.key) && operatorCount === 0) {
          ++operatorCount;
          display.textContent += event.key;
      } else break;
  }

  if(isOperator(event.key) && operatorCount === 0) {
      ++operatorCount;
      display.textContent += event.key;
  }

  resizeFont();
}, true);

window.addEventListener("keyup", function (event) {

  
  switch(event.key) {
    case 'Backspace': backspace(); break;
    case "Escape": 
      document.querySelector('.clear').classList.toggle('active'); 
      clear(); 
      break;
    default:
      if(isFinite(event.key)) {
        digitButton = document.querySelector(`.button-${event.key}`);
        digitButton.classList.toggle('active');
      } else if(isOperator(event.key) && operatorCount === 0) {
          ++operatorCount;
          display.textContent += event.key;
      } return; // Quit when this doesn't handle the key event.
  }

  if(isFinite(event.key)) {
    digitButton = document.querySelector(`.button-${event.key}`);
    digitButton.classList.toggle('active');
  }
}, true);

function clear() {
  // TODO erase memory
  display.textContent = 0;
}

function backspace() {
  if(isOperator) resetOperatorCount();
  display.textContent.length > 1 ? 
    display.textContent = display.textContent.slice(0, -1) :
    display.textContent = 0;
}

function isOperator(a) {
  return a === '/' || a === '*' || a === '-' || a === '+' || a === '=' || a === 'Enter';
}

// Hardcoded. Some day should be changed to dynamic 
// comparison between element and text width
function resizeFont() {
  // TODO add min font size, parse style.fontSize
  //&& Number(display.style.fontSize.toString.splice(0, 1)) > 10
  if(display.textContent.length > 24) {
    display.style.fontSize = '6px';
  } else if(display.textContent.length > 12) {
    display.style.fontSize = '12px';
  } else display.style.fontSize = '24px';
}

function resetOperatorCount() {
  operatorCount === 0;
}