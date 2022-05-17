'use strict';

const $circle = document.getElementById('equal')
const $calcDiv = document.querySelector('.calc-div');
const $line0 = document.querySelector('.line0');
const $line1 = document.querySelector('.line1');
const $history = document.querySelector('.history');

$circle.addEventListener('click', function() {
    $circle.classList.add('circle-clicked');
    $calcDiv.classList.add('calc-div-clicked');
    $line0.classList.add('line0-clicked');
    $line1.classList.add('line1-clicked');
})

let a = ''; // first number
let b = ''; // second number
let sign = '' // math sign
let finish = false; // true if equal is finished properly
let equalClicked = 0; // the number of clicks on equal button, can't be more than two, it's костыль
let signChanged = false; // shows that sign is changed 
let signTemp = sign;

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const ACTIONS = ['+', '−', '×', '÷', 'Vⁿ‾', 'xⁿ'];
const ACTIONSwithoutB = ['V‾', 'x²', '1/x', '%'];

const HISTORY = [];

const $output = document.querySelector('.result');
const $outputInfo = document.querySelector('.output');
const $buttons = Array.from(document.querySelectorAll('.button'));

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    $output.innerText = '0';
    $outputInfo.innerText = '';
}

$buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const btnText = button.innerText;
        //special buttons

        //clearAll
        if (btnText === 'С') {
            clearAll();
        };

        //backspace
        if (btnText === '«') {
            $output.innerText = $output.innerText.slice(0, -1);
        };
        
        if (btnText === '«' && b === '') {
            a = $output.innerText;
        } else if (btnText === '«' && b !== '') {
            b = $output.innerText
        };

        //digits
        //dot
        if (!$output.innerText.includes('.') && btnText === '.') {
            // возможно тоже необходим else if
            if (b === '' && sign === '') {
                if (a === '') {
                    a = '0.'
                } else {
                    a += '.';
                }
                $output.innerText = a;
            } else if (a !== '' && b !== '' && finish && equalClicked > 1) {
                b = '0.'
                $output.innerText = b;
                finish = false;
            }
            else {
                if (b === '') {
                    b = '0.'
                } else {
                    b += '.';
                }
                $output.innerText = b;
            }
        } else if ($output.innerText.includes('.') && btnText === '.') {
            if (b === '' && sign === '') {
                a = '0.'
                $output.innerText = a;
            } else if (a !== '' && b !== '' && finish && equalClicked > 1) {
                b = '0.';
                $output.innerText = b;
                finish = false;
            } else {
                b = '0.'
                $output.innerText = b;
            }
        }
        //clear with dot
        if (btnText === '.' && b !== '' &&  a !== '' && signChanged === false && equalClicked > 1) {
            clearAll();
            a = '0.';
            $output.innerText = a;
        }
        //digits
        if (DIGITS.includes(btnText)) {
            if (b === '' && sign === '') {
                a += btnText;
                $output.innerText = a;
            } else if (a !== '' && b !== '' && finish && equalClicked > 1) {
                b = btnText;
                $output.innerText = b;
                finish = false;
            } else {
                b += btnText;
                $output.innerText = b;
            }

            if ((b !== '' && a !== '') && signChanged === false && equalClicked > 1) {
                clearAll();
                a = btnText;
                $output.innerText = a;
            }
        }
        
        //signs
        if (ACTIONS.includes(btnText)) {
            sign = btnText;
            signChanged = true;
            $outputInfo.innerText = `${a} ${sign}`;
        }
    })
});


$circle.addEventListener('click', (e) => {    
    if (b === '') { b = a }
 
    const str1 = `${a} ${sign} ${b} =`;
    if (a !== '' && sign !== '' && b !== '') {
        $outputInfo.innerText = str1;
    };

    switch (sign) {
        case '+':
            a = +a + +b;
            break;
        case '−':
            a = a - b;
            break;
        case '×': 
            a = a * b;
            break;
        case '÷':
            a = a / b;
            // деление на ноль
            break;
        case 'xⁿ': 
            a = Math.pow(a, b)
            break;
        case 'Vⁿ‾': 
            a = a ** (1/b)
            break;
    }

    if (a !== '' && sign !== '') {
        $output.textContent = a;
        HISTORY.push(str1.concat(' ', a));
    }

    finish = true;
    signChanged = false;
    
    if (equalClicked < 2) {
        equalClicked += 1;
    }
});

$history.addEventListener('click', (e) => {
    console.log(HISTORY)
})
