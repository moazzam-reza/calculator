function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function percent(x, y) {
    return x / 100;
}

let num1 = "0";
let operator = "";
let num2 = "0";
let operatorFlag = false;
let equationDoneFlag = false;

let operators = ["+", "-", "*", "/", "%"]

let operatorToFunction = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
    "%": percent,
}

function operate(num1, operator, num2) {
    console.log(num1, num2);
    return operatorToFunction[operator](num1, num2);
}

function handleButtonClick(e) {
    let value = e.target.textContent;
    console.log(value);
    const display = document.querySelector(".display");

    if (value == "C") {
        display.textContent = '';
        num1 = "0";
        num2 = "0";
        operator = "";
        operatorFlag = false;
        equationDoneFlag = false;
    }
    else {
        if (!isNaN(+value) || value == ".") {
            if (equationDoneFlag) {
                display.textContent = '';
                equationDoneFlag = false;
            }

            let decimalFlag = display.textContent && !display.textContent.includes(".");

            if (operatorFlag && num2 == "0" && value != ".") {
                display.textContent = '' + value;
                num2 = display.textContent;
            }
            else if (operatorFlag && display.textContent.length < 9) {
                if (value == "." && decimalFlag || value != ".") {
                    display.textContent += value;
                    num2 = display.textContent;
                }
            }
            else if (display.textContent.length < 9) {
                if (value == "." && decimalFlag || value != ".") {
                    display.textContent += value;
                    num1 = display.textContent;
                }
            }
        }
        else if (operators.includes(value)) {
            if (operatorFlag && !equationDoneFlag) {
                if (num1.at(-1) == ".") num1 = num1 + "0";
                if (num2.at(-1) == ".") num2 = num2 + "0";
                let result = operate(+num1, operator, +num2);
                result = result.toString().substr(0, 9);

                if (result.at(-1) == ".") result = result.substr(0, result.length - 1);
                display.textContent = result;
                num1 = display.textContent;
                num2 = "0";
                equationDoneFlag = true;
            }
            operatorFlag = true;
            operator = value;
        }
        else if (value == "=") {
            if (operatorFlag = true) {
                operatorFlag = false;

                if (num1.at(-1) == ".") num1 = num1 + "0";
                if (num2.at(-1) == ".") num2 = num2 + "0";

                if (operator == "/" && num2 == 0) {
                    display.textContent = 'retard';
                    num1 = "0";
                    num2 = "0";
                    operator = "";
                    operatorFlag = false;
                }
                else {
                    let result = operate(+num1, operator, +num2);
                    result = result.toString().substr(0, 9);
                    if (result.at(-1) == ".") result = result.substr(0, result.length - 1);
                    display.textContent = result;
                    num1 = display.textContent;
                    num2 = "0";
                }

                equationDoneFlag = true;
            }
        }
        else if (value == "+/-") {
            if (operatorFlag && display.textContent.length < 9) {
                if (num2.includes("-")) {
                    num2 = num2.replace("-", "+");
                }
                else if (num2.includes("+")) {
                    num2 = num2.replace("+", "-");
                }
                else {
                    num2 = "-" + num2;
                }

                display.textContent = +num2;
            }
            else if (display.textContent.length < 9) {
                if (num1.includes("-")) {
                    num1 = num1.replace("-", "+");
                }
                else if (num1.includes("+")) {
                    num1 = num1.replace("+", "-");
                }
                else {
                    num1 = "-" + num1;
                }

                display.textContent = +num1;
            }
        }
    }
}


let buttons = document.getElementsByClassName("button");

for (let i=0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButtonClick);
}

document.addEventListener('keydown', (e) => {
    const display = document.querySelector(".display");

    keyMapping = {
        "1": "one",
        "2": "two",
        "3": "three",
        "4": "four",
        "5": "five",
        "6": "six",
        "7": "seven",
        "8": "eight",
        "9": "nine",
        "0": "0",
        "c": "clear",
        "%": "percent",
        "=": "equals",
        "+": "add",
        "-": "subtract",
        "/": "divide",
        "*": "multiply",
        "~": "sign",
        "Enter": "equals",
        ".": "dot",
    }


    if (e.key == "Backspace") {
        display.textContent = display.textContent.slice(0, -1);

        if (operatorFlag && display.textContent.length < 9) {
            if (display.textContent == '' || display.textContent == '-') {
                num2 = "0";
            }
            else {
                num2 = display.textContent;
            }
        }
        else if (display.textContent.length < 9) {
            if (display.textContent == '' || display.textContent == '-') {
                num1 = "0";
            }
            else {
                num1 = display.textContent;
            }
        }
    }
    else {
        const buttonId = keyMapping[e.key];

        if (buttonId) document.getElementById(buttonId).click();
    }

})
