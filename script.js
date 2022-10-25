// Globals //

const display = document.querySelector('.display');
let _num1 = 0;
let _num2 = 0;
let _operator = '';
let _decimalCount = 0;
let _num1decimalCount = 0;
let _num2decimalCount = 0;
let _operatorCount = 0;
let _isFirstRound = true;
let _hasError = false;

// Operations //

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
  switch (oper) {

    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: {
      _hasError = true;
      return 'Error: invalid operator';
    }
  }
}

// Input //

document.querySelectorAll('button').forEach(item => {
  item.addEventListener('click', event => {
    parseClick(item.textContent);
  });
});

window.addEventListener("keydown", function (event) {
  parseKeyDown(event.key);
}, true);

window.addEventListener("keyup", function (event) {
  parseKeyUp(event.key);
}, true);

// Parse //

function parseClick(btnTxt) {
  if (_hasError) clear();
  switch (btnTxt) {
    case 'C': clear(); break;
    case '←': backspace(); break;
    case '.': decimalInput(); break;
    case '=': equalSignInput()
    default: if (isFinite(btnTxt)) {
      digitInput(btnTxt);
    } else if (isOperator(btnTxt)) {
      operatorInput(btnTxt);
    }
  }
  resizeFont();
}

function parseKeyDown(key) {
  switch (key) {
    case 'Escape':
      document.querySelector('.clear').classList.add('active');
      clear();
      break;
    case 'Backspace':
      document.querySelector('.backspace').classList.add('active');
      backspace();
      break;
    case '.':
      document.querySelector('.decimal').classList.add('active');
      decimalInput();
      break;
    case '=':
      document.querySelector('.equal').classList.add('active');
      equalSignInput();
      break;
    case 'Enter':
      document.querySelector('.equal').classList.add('active');
      equalSignInput();
      break;
    default:
      if (isFinite(key)) {
        document.querySelector(`.button-${key}`).classList.add('active');
        digitInput(key);
        break;
      } else if (isOperator(key)) {
        document.querySelector(`.${operator2string(key)}`).classList.add('active');
        operatorInput(key);
        break;
      } else break;
  }
  resizeFont();
}

function parseKeyUp(key) {
  switch (key) {
    case "Escape":
      document.querySelector('.clear').classList.remove('active');
      clear();
      break;
    case 'Backspace':
      document.querySelector('.backspace').classList.remove('active');
      backspace();
      break;
    case '.':
      document.querySelector('.decimal').classList.remove('active');
      break;
    case '=':
      document.querySelector('.equal').classList.remove('active');
      break;
    case 'Enter':
      document.querySelector('.equal').classList.remove('active');
      break;
    default:
      if (isFinite(key)) {
        document.querySelector(`.button-${key}`).classList.remove('active');
        break;
      } else if (isOperator(key)) {
        document.querySelector(`.${operator2string(key)}`).classList.remove('active');
        break;
      } else break;
  }
}

function parseDisplay() {
  // Find Operator
  let i = 0;
  for (i; i < display.textContent.length; ++i) {
    if (isOperator(display.textContent[i])) {
      if (i >= 1 && isFinite(display.textContent[i - 1])) { // ignore negative numbers
        break;
      }
    }
  }
  
  // return if no operator is found
  if (i === display.textContent.length) {
    return;
  }

  _num1 = Number(display.textContent.slice(0, i));
  _operator = display.textContent[i];
  _num2 = Number(display.textContent.slice(i + 1));

  if (_operator === '/' && _num2 === 0) {
    display.textContent = '🚀 To Infinity! And Beyond! 🚀';
    _hasError = true;
  } else {
    // Calculate and round to 5 decimal places. + in front to drop ending zeroes
    let result = +operate(_num1, _operator, _num2).toFixed(5);
    if (!Number.isInteger(result)) {
      _decimalCount = 1;
    }
    display.textContent = result;
    _isFirstRound = false;
  }
}

// Input

function digitInput(digit) {
  display.textContent[0] === '0' && _isFirstRound ?
    display.textContent = digit :
    display.textContent += digit;
}

function decimalInput() {
  if (_decimalCount === 0) {
    display.textContent += '.';
    ++_decimalCount;
  }
}

function operatorInput(oper) {
  let lastChar = display.textContent[display.textContent.length - 1]

  // if it is first operator, add to string
  if (_operatorCount === 0) {
    // if previous symbol is an operator, replace it
    if (isOperator(lastChar)) {
      display.textContent = display.textContent.slice(0, -1) + oper;
      _operator = oper;
      ++_operatorCount;
    } else {
      display.textContent += oper;
      _operator = oper;
      ++_operatorCount;
    }
    resetDecimalCount();
  }
  // if it is second operator in formula, parse string and display result
  else {
    parseDisplay();
    resetOperatorCount;
    display.textContent += oper;
  }
}

function equalSignInput() {
  if (isOperator(display.textContent[display.textContent.length - 1])) {
    display.textContent = display.textContent.slice(0, -1);
  } else {
    parseDisplay();
  }
  resetOperatorCount();
}

// Button Funcs //

function clear() {
  _num1 = 0;
  _num2 = 0;
  _operator = '';
  _operatorCount = 0;
  _decimalCount = 0;
  _isFirstRound = true;
  _hasError = false;
  display.textContent = 0;
}

function backspace() {
  let lastChar = display.textContent[display.textContent.length - 1];
  if (isOperator(lastChar)) resetOperatorCount();
  if (isDecimal(lastChar)) resetDecimalCount();
  display.textContent.length > 1 ?
    display.textContent = display.textContent.slice(0, -1) :
    display.textContent = 0;
  resizeFont();
}

// Bool check Funcs //

function isOperator(a) {
  return a === '/' || a === '*' || a === '-' || a === '+';
}

// function isEqualSign(a) {
//   return a === '=' || a === 'Enter';
// }

function isDecimal(a) {
  return a === '.';
}

// Reset Funcs //

function resetOperatorCount() {
  _operatorCount = 0;
}

function resetDecimalCount() {
  _decimalCount = 0;
}

function resetValues() {

}

// Helper Funcs //

function num2fromDisplay() {
  for (let i = 0; i < display.textContent.length; ++i) {
    if (isOperator(display.textContent[i])) {
      return display.textContent.slice(i + 1);
    }
  }
  return NaN;
}

function operator2string(oper) {
  switch (oper) {
    case '/':
      return 'divide';
      break;
    case '*':
      return 'multiply';
      break;
    case '-':
      return 'subtract';
      break;
    case '+':
      return 'add';
      break;
  }
}

// Hardcoded. Some day should be changed to dynamic 
// comparison between element and text width
function resizeFont() {
  if (_hasError) {
    display.style.fontSize = '12px';
    return;
  }

  // TODO add min font size, parse style.fontSize
  //&& Number(display.style.fontSize.toString.splice(0, 1)) > 10
  if (display.textContent.length > 22) {
    display.style.fontSize = '6px';
  } else if (display.textContent.length > 11) {
    display.style.fontSize = '12px';
  } else display.style.fontSize = '24px';
}