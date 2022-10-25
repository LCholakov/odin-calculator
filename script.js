// Globals //

const display = document.querySelector('.display');
let _num1 = 0;
let _num2 = 0;
let _operator = '';
let _decimalCount = 0;
let _num1decimalCount = 0;
let _num2decimalCount = 0;
let _operatorCount = 0;

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
        default: return 'Error: invalid operator';
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
    switch (btnTxt) {
        case 'C': clear(); break;
        case '←': backspace(); break;
        case '.': decimalInput; break;
        default: if (isFinite(btnTxt)) {
            digitInput(btnTxt);
        } else if (isOperator) {
            operatorInput(btnTxt);
        }
    }
    resizeFont();
}

function parseKey(key) {

}

function digitInput(digit) {
    display.textContent[0] === '0' ?
        display.textContent = digit :
        display.textContent += digit;
}

function decimalInput(decimal) {

}

function operatorInput(oper) {
    if (_operatorCount === 0) {
        display.textContent += oper;
        _operator = oper;
        ++_operatorCount;
    } else {
        parseDisplay();
        resetOperatorCount;
        if (oper !== '=') {
            display.textContent += oper;
        }
    }
}

function parseDisplay() {
    let i = 0;
    for (i; i < display.textContent.length; ++i) {
        if (isOperator(display.textContent[i])) {
            break;
        }
    }

    _num1 = Number(display.textContent.slice(0, i));
    _operator = display.textContent[i];
    _num2 = Number(display.textContent.slice(i + 1));

    console.log(_num1, _operator, _num2);
    console.log(operate(_num1, _operator, _num2));
    display.textContent = operate(_num1, _operator, _num2);
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
    display.textContent = 0;
}

function backspace(char) {
    let lastChar = display.textContent[display.textContent.length - 1];
    if (isOperator(lastChar)) resetOperatorCount();
    if (isDecimal(lastChar))
        display.textContent.length > 1 ?
            display.textContent = display.textContent.slice(0, -1) :
            display.textContent = 0;
}

// Bool check Funcs //

function isOperator(a) {
    return a === '/' || a === '*' || a === '-' || a === '+' || a === '=' || a === 'Enter';
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
    // TODO add min font size, parse style.fontSize
    //&& Number(display.style.fontSize.toString.splice(0, 1)) > 10
    if (display.textContent.length > 24) {
        display.style.fontSize = '6px';
    } else if (display.textContent.length > 12) {
        display.style.fontSize = '12px';
    } else display.style.fontSize = '24px';
}