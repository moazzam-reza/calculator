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
let justPressedEqualSign = false;
let prevKey = "0";

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
        justPressedEqualSign = false;
    }
    else if (display.textContent != "retard") {
        console.log(value);
        console.log(justPressedEqualSign);
        if (value != "=") justPressedEqualSign = false;
        console.log(operatorFlag);

        if (!isNaN(+value) || value == ".") {
            if (equationDoneFlag) {
                display.textContent = '';
                equationDoneFlag = false;
            }

            let decimalFlag = display.textContent && !display.textContent.includes(".");

            if (operatorFlag && num2 == "0" && value != ".") {
                display.textContent = '' + value;
                num2 = display.textContent;
                console.log("ENTERED NUM 2 AREA")
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
                console.log("NUM1 AREA");
            }

            prevKey = value;
        }
        else if (operators.includes(value)) {
            if (operatorFlag && !equationDoneFlag && !operators.includes(prevKey)) {
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
            prevKey = value;
        }
        else if (value == "=") {
            if (operatorFlag == true && !operators.includes(prevKey) || justPressedEqualSign) {
                operatorFlag = false;

                if (num1.at(-1) == ".") num1 = num1 + "0";
                if (num2.at(-1) == ".") num2 = num2 + "0";

                if (operator == "/" && num2 == 0 && !justPressedEqualSign) {
                    display.textContent = 'retard';
                    num1 = "0";
                    num2 = "0";
                    operator = "";
                    operatorFlag = false;
                }

                if (!justPressedEqualSign) {
                    let result = operate(+num1, operator, +num2);
                    result = result.toString().substr(0, 9);
                    if (result.at(-1) == ".") result = result.substr(0, result.length - 1);
                    display.textContent = result;
                    num1 = display.textContent;
                    prevKey = num2;
                    num2 = "0";
                }
                else {
                    let result = operate(+num1, operator, +prevKey);
                    result = result.toString().substr(0, 9);
                    if (result.at(-1) == ".") result = result.substr(0, result.length - 1);
                    display.textContent = result;
                    num1 = display.textContent;
                }

                equationDoneFlag = true;
                justPressedEqualSign = true;
            }
        }
        else if (value == "+/-") {
            if (operatorFlag && display.textContent.length < 9  && equationDoneFlag) {
                if (num1.includes("-")) {
                    num1 = num1.replace("-", "+");
                }
                else if (num1.includes("+")) {
                    num1 = num1.replace("+", "-");
                }
                else {
                    num1 = "-" + num1;
                }
                console.log(num1);
                display.textContent = +num1;
            }
            else if (operatorFlag && display.textContent.length < 9) {
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

            prevKey = value;
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
        "0": "zero",
        "c": "clear",
        "C": "clear",
        "%": "percent",
        "=": "equals",
        "+": "add",
        "-": "subtract",
        "/": "divide",
        "*": "multiply",
        "~": "sign",
        "Enter": "equals",
        ".": "dot",
        "x": "multiply",
        "s": "sign",
    }

    let clearMappingOnly = {
        "c": "clear",
        "C": "clear",
    }


    if (e.key == "Backspace" && display.textContent != 'retard') {
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
    else if (display.textContent != 'retard') {
        const buttonId = keyMapping[e.key];

        if (buttonId) document.getElementById(buttonId).click();
    }
    else {
        const buttonId = clearMappingOnly[e.key];

        if (buttonId) document.getElementById(buttonId).click();
    }
})
