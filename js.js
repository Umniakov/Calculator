const allTheKeys = [...document.querySelectorAll('.button')];
allTheKeys.forEach(e => e.addEventListener('click', takeValue))
let currentInput = '';
let calc = []
const signsForMath = ['+', '-', '/', '*', '%'];
let arrX = [];
let arrSum =[];
let holder = [];
let NotFirstExp = false;

function takeValue(e) {
    e.preventDefault();
    let input = e.target.value;
    // console.log(input)
    // console.log(calc)
    if (!isNaN(input)) {
        currentInput += input;
    } else if (input === 'ce') {
        calc = [];
        console.log(calc)
    } else if (input === 'c') {
        calc.pop();
        console.log(calc)
    } else if (input === '--') {
        currentInput = `-${currentInput}`;
    } else if (input === '.') {
        if (!isThereDecimal(currentInput)) {
            currentInput += '.';
        }
    } else if (input === '=') {
        makeAStore(currentInput);
        arrX = [...calc];
        doingMath(arrX);
        calc = [];
        calc[0] = arrX[0];
        arrX = [];
        console.log(calc)
        console.log(arrX);
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
    calc.push(value)
}

function isThereDecimal(string) {
    return string.includes('.') ? true : false;
}

function lastSaved(x) {
    if (calc.length) {
        if (signsForMath.includes(calc[calc.length - 1])) {
            console.log(x);
            console.log(calc[calc.length - 1]);
            calc[calc.length - 1] = x;
        } else {
            calc.push(x)
        }
    // } else {
    //     calc = [];        
    // }
    }
}



function doingMath(arrX) {
    const firstIndex2 = arrX.findIndex(e => e === '-');
    let iteration = arrX.length / 2;
        for (let i = 1; i < iteration; i++) {
        const firstIndex = arrX.findIndex(e => e === '*' || e === '/' || e === '%');
        if (arrX[firstIndex] === '*') {
            arrSum = Number(arrX[firstIndex - 1]) * Number(arrX[firstIndex + 1]);
            arrX.splice(firstIndex - 1, 3, arrSum)
        } else if (arrX[firstIndex] === '/') {
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
                console.log('yes')
                arrSum = Number(arrX[firstIndexOfRemain - 1]) - Number(arrX[firstIndexOfRemain + 1]);
                arrX.splice(firstIndexOfRemain - 1, 3, arrSum)
            }
        }
    }
}
    // console.log(arrSum)
    // console.log(arrX)
    // // let testt = Number('5.55')
    // // console.log(testt)



