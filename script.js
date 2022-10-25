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
  console.log('add');
  return a + b;
  resetOperatorCount();
};

function subtract(a, b) {
  console.log('subtract');
  return a - b;
  resetOperatorCount();
};

function multiply(a, b) {
  console.log('multiply');
  return a * b;
  resetOperatorCount();
};

function divide(a, b) {
  console.log('divide');
  return a / b;
  resetOperatorCount();
}

function operate(a, oper, b) {
  console.log('operate');
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

}, true);

window.addEventListener("keyup", function (event) {

}, true);

// Parse //

function parseClick(btnTxt) {
  console.log('Parse Click');
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

function parseKey(key) {

}

function digitInput(digit) {
  console.log('Digit Input');
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
  console.log('Operator Input');
  let lastChar = display.textContent[display.textContent.length - 1]
  console.log(lastChar);

  // if it is first operator, add to string
  if (_operatorCount === 0) {
    // if previous symbol is an operator, replace it
    if (isOperator(lastChar)) {
      console.log('lastChar is operator');
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
    console.log(oper, display.textContent);
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

function parseDisplay() {
  console.log('Parse Display');
  let i = 0;
  for (i; i < display.textContent.length; ++i) {
    if (isOperator(display.textContent[i])) {
      if (i >= 1 && isFinite(display.textContent[i - 1])) { // ignore negative numbers
        break;
      }
    }
  }

  _num1 = Number(display.textContent.slice(0, i));
  _operator = display.textContent[i];
  _num2 = Number(display.textContent.slice(i + 1));

  console.log(_num1, _operator, _num2);
  console.log(operate(_num1, _operator, _num2));
  if (_operator === '/' && _num2 === 0) {
    display.textContent = '🚀 To Infinity! And Beyond! 🚀';
    _hasError = true;
  } else {
    display.textContent = operate(_num1, _operator, _num2);
    _isFirstRound = false;
  }
}

// STATE LOGIC

// operator button disable when: one operator has been added. If erase, check whether to undo disable.If
// decimal disable when: one decimal per current Number.
// zero/ 00 disable when: operator is divide

// Input logic -> if char is digit -> input, if operator -> save num

// Parse string on every input and decide state

// Button Funcs //

function clear() {
  _num1 = 0;
  _num2 = 0;
  _operator = '';
  _operatorCount = 0;
  _num1decimalCount = 0;
  _num2decimalCount = 0;
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

}

// Bool check Funcs //

function isOperator(a) {
  return a === '/' || a === '*' || a === '-' || a === '+';
}

function isEqualSign(a) {
  return a === '=' || a === 'Enter';
}

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
    case '=':
      return 'equal';
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
  if (display.textContent.length > 24) {
    display.style.fontSize = '6px';
  } else if (display.textContent.length > 12) {
    display.style.fontSize = '12px';
  } else display.style.fontSize = '24px';
}