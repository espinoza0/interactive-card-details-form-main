// Card Front-Back Data
const cardNumText = document.getElementById('card-number');
const cardHolderName = document.getElementById('card-name');
const cardDateM = document.getElementById('card-date-M');
const cardDateY = document.getElementById('card-date-Y');
const cardCvc = document.getElementById('card-cvc');


// Form
const form = document.getElementById('form');
// Form Inputs Elements
const fholderName = document.getElementById('fholdername');
const fcardNum = document.getElementById('fcardnum');
const fexpDateM = document.getElementById('fexpdatem');
const fexpDateY = document.getElementById('fexpdatey');
const fcvc = document.getElementById('fcvc');

// Errors
const holderNameError = document.querySelector('span.holderName-error');
const numberError = document.querySelector('span.number-error');
const expDateError = document.querySelector('span.expDate-error');
const cvcError = document.querySelector('span.cvc-error');

// Regular Expressions
let alphaRegex = /^[a-zA-Z]+$/;
let numRegex = /^\d+$/;
let spacesRegex = /\s/g;

let valid = 1;
let year = new Date().getFullYear() - 2000;

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    validate();
});


// Inputs
fholderName.addEventListener('input', function(){
    if (fholderName.value.trim() == "") {
        cardHolderName.innerHTML = "Jane Appleseed";
    }else{
        cardHolderName.innerHTML = fholderName.value;
    }
    validateInputFormat(alphaRegex, fholderName, holderNameError);
});
fcardNum.addEventListener('input', function(){
    if (fcardNum.value.trim() == "") {
        cardNumText.innerHTML = "0000 0000 0000 0000";
    }else{
        fcardNum.value = fcardNum.value.replace(spacesRegex, '').replace(/([0-9]{4})/g, "$1 ").trim();
        cardNumText.innerHTML = fcardNum.value;
    }

    validateInputFormat(numRegex, fcardNum, numberError);
});
fexpDateM.addEventListener('input', function(){

    if (fexpDateM.value.trim() == "") {
        cardDateM.innerHTML = "00";
    }else{
        fexpDateM.value = fexpDateM.value.replace(spacesRegex, '')
        cardDateM.innerHTML = fexpDateM.value;
    }

    validateInputFormat(numRegex, fexpDateM, expDateError);
});
fexpDateY.addEventListener('input', function(){
    cardDateY.innerHTML = fexpDateY.value;

    if (fexpDateY.value.trim() == "") {
        cardDateY.innerHTML = "00";
    }else{
        fexpDateY.value = fexpDateY.value.replace(spacesRegex, '');
        cardDateY.innerHTML = fexpDateY.value;
    }

    validateInputFormat(numRegex, fexpDateY, expDateError);
});
fcvc.addEventListener('input', function(){
    if (fcvc.value.trim() == "") {
        cardCvc.innerHTML = "000";
    }else{
        fcvc.value = fcvc.value.replace(spacesRegex, '');
        cardCvc.innerHTML = fcvc.value;
    }

    validateInputFormat(numRegex, fcvc, cvcError);
});

//function that is executed every time the user inputs a value
function validateInputFormat(regex, input, spanErr){
    let restr = "numbers";
    if (regex == alphaRegex){
        restr = "text";
    }
    let inp = input.value.trim().replaceAll(' ', '');

    if (!(regex.test(inp))){
        spanErr.innerHTML = "Wrong format, " +  restr + " only";
        input.classList.add('input-err');
    }else{
        if (input == fexpDateM) {
            if (parseInt(input.value.trim()) > 12) {
                input.classList.add('input-err');
                spanErr.innerHTML = "Incorrect value";
            }else{
                input.classList.remove('input-err');
                spanErr.innerHTML = "";
            }
        }else if(input == fexpDateY){
            console.log(parseInt(input.value.trim()));

            if (parseInt(input.value.trim()) < year) {
                input.classList.add('input-err');
                spanErr.innerHTML = "Incorrect value";
            }else{
                input.classList.remove('input-err');
                spanErr.innerHTML = "";
            }
        }else{
            input.classList.remove('input-err');
            spanErr.innerHTML = "";
        }
    }
}

// Validate Inputs Function
function validate(){
    let inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        let parent = input.parentNode;
        let sp = parent.querySelector('span');

        if (!(parent.classList.contains('form-exp-date'))) {
            if (input.value.trim() == "") {
                input.classList.add('input-err');
                sp.innerHTML = "Can't be blank";
            }else{
                if (input != fholderName) {
                    validateInputFormat(numRegex, input, sp);
                }else{
                    validateInputFormat(alphaRegex, input, sp);
                }
            }
        }else{
            sp = parent.parentNode.querySelector('span');
            let expInput = parent.querySelectorAll('input');
            
            for (let i = 0; i < expInput.length; i++) {
                if (expInput[0].value.trim() == "" || expInput[1].value.trim() == "") {
                    if (expInput[i].value.trim() == "") {
                        validateInputFormat(expInput[i], input, spanErr)
                    }
                }
            }
        }
    });
}

function addedCardDetails(){
    // if () {
        
    // }
}