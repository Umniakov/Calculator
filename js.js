const allTheKeys = [...document.querySelectorAll('.button')];
const displayUp = document.querySelector('.display-first-row');
const displayDown = document.querySelector('.display-second-row');
allTheKeys.forEach(e => e.addEventListener('click', takeValue))
let currentInput = '';
let keySupport = ['+', '-', '/', '*', '%', '=', '.'];
let calc = []
const signsForMath = ['+', '-', '/', '*', '%'];
let arrX = [];
let arrSum =[];
let holder = [];
let NotFirstExp = false;
let currentValue = '';
let input = '';

addEventListener('keydown', keyInput);

function keyInput(e) {
    if (keySupport.includes(e.key) || !isNaN(e.key)) {
        takeValue(e.key)
    } else if (e.key === 'Enter') {
        takeValue('=')
    }
}

function takeValue(e) {
    if  (e.target?.value) {
        e.preventDefault();
        input = e.target.value;
    } else {
        input = e;
    }
    currentValue = input;
    if (!isNaN(input)) {
        currentInput += input;
        displayDown.textContent = Number(currentInput);
    } else if (input === 'ce') {
        calc = [];
        arrX = [];
        currentInput = '';
        displayDown.textContent = '';
        displayUp.textContent = '';
    } else if (input === 'c') {
        if (currentInput) {
            currentInput = '';
            displayDown.textContent = '';
        } else {
            calc.pop();
            lastSaved();
        }
    } else if (input === '--') {
        if (currentInput.includes('-')) {
            currentInput = `${currentInput.substring(1)}`;
        } else {
        currentInput = `-${currentInput}`;
        }
        displayDown.textContent = currentInput;
    } else if (input === '.') {
        if (!isThereDecimal(currentInput)) {
            currentInput += '.';
            displayDown.textContent += input;
        }
    } else if (input === '=') {
        makeAStore(currentInput);
        holder = [...calc];
        arrX = [...calc];
        doingMath(arrX);
        calc = [];
        calc[0] = arrX[0];
        if (arrX.length < 2) {
            displayDown.textContent = calc;
            displayUp.textContent += Number(currentInput) + ' =';
    } else {
        displayDown.textContent = 'damn you a fool';
        }
        arrX = [];
        currentInput = '';
        NotFirstExp = true;
    } else {
        if (!currentInput && signsForMath.includes(input) && !NotFirstExp) {
            console.log('you are a fool!')
        } else if (!isNaN(currentInput) && currentInput !== '') {
            makeAStore(currentInput);
            currentInput = '';
        }
        lastSaved(input);
    }

}

function makeAStore(value) {
    calc.push(Number(value))
}

function isThereDecimal(string) {
    return string.includes('.') ? true : false;
}

function lastSaved(x = 'upd') {
    if (x !== 'upd') {
        if (calc.length) {
            if (signsForMath.includes(calc[calc.length - 1])) {
                calc[calc.length - 1] = x;
            } else {
                calc.push(x)
            }
        }
    }
    displayUp.textContent = '';
    calc.forEach(e => {
        displayUp.textContent += ` ${e} `
        })   
    displayDown.textContent = '';
}

function doingMath(arrX) {
    let iteration = arrX.length / 2;
        for (let i = 1; i < iteration; i++) {
        const firstIndex = arrX.findIndex(e => e === '*' || e === '/' || e === '%');
        if (arrX[firstIndex] === '*') {
            arrSum = Number(arrX[firstIndex - 1]) * Number(arrX[firstIndex + 1]);
            arrX.splice(firstIndex - 1, 3, arrSum)
        } else if (arrX[firstIndex] === '/') {
            if (Number(arrX[firstIndex + 1]) === 0) {  
                return;              
            }
            arrSum = Number(arrX[firstIndex - 1]) / Number(arrX[firstIndex + 1]);
            arrX.splice(firstIndex - 1, 3, arrSum)
        } else if (arrX[firstIndex] === '%') {
            arrSum = Number(arrX[firstIndex - 1]) % Number(arrX[firstIndex + 1]);
            arrX.splice(firstIndex - 1, 3, arrSum)
        } else if (firstIndex === -1) {
            const firstIndexOfRemain = arrX.findIndex(e => e === '+' || e === '-');
            if (arrX[firstIndexOfRemain] === '+') {
                arrSum = Number(arrX[firstIndexOfRemain - 1]) + Number(arrX[firstIndexOfRemain + 1]);
                arrX.splice(firstIndexOfRemain - 1, 3, arrSum)
            } else if (arrX[firstIndexOfRemain] === '-') {
                arrSum = Number(arrX[firstIndexOfRemain - 1]) - Number(arrX[firstIndexOfRemain + 1]);
                arrX.splice(firstIndexOfRemain - 1, 3, arrSum)
            }
        }
    }
    arrX[0] = (arrX[0].toFixed(4).replace(/[.,]?0+$/, ''));
}
