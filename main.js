const resultEl = document.getElementById('result');
const uppercaseEl = document.getElementById('upperCase');
const lowercaseEl = document.getElementById('lowerCase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');


const strengthEl = document.getElementById('strength-value');



const UPPERCASE_CHAR_CODE = arrayLowToHigh(65,90);
const LOWERCASE_CHAR_CODE = arrayLowToHigh(97,122);
const NUMBERS_CHAR_CODE = arrayLowToHigh(48,57)
const SYMBOLS_CHAR_CODE = arrayLowToHigh(33,47).concat(
    arrayLowToHigh(58,64)
).concat(
    arrayLowToHigh(91,96)
).concat(
    arrayLowToHigh(123,126)
);


const CharacterAmountRange = document.getElementById('bar-lenght');
const CharacterAmountNumber = document.getElementById('char-len');


CharacterAmountRange.addEventListener('input', syncCharacters);
CharacterAmountNumber.addEventListener('input', syncCharacters);

function syncCharacters(e) {
    const value = e.target.value
    CharacterAmountNumber.value = value
    CharacterAmountRange.value = value
}



//when generate button is clicked, give the password based on the inputs selected
generateEl.addEventListener('click', (e) => {
    e.preventDefault()
    //check if the boxes are selected or not
    const charAmount = CharacterAmountNumber.value;
    const LowerCase = lowercaseEl.checked;
    const UpperCase = uppercaseEl.checked;
    const Numbers = numbersEl.checked;
    const Symbols = symbolsEl.checked;
    const password = generatePassword(charAmount, LowerCase, UpperCase, Numbers, Symbols);
    const strengthchecker = checkPasswordStrength(password, LowerCase, UpperCase,Numbers,Symbols);


    //return the password code and display it in the html in place of the h1 tag
    resultEl.innerText = password;
    
    //update strength rating and display the word for the strength value
    strengthEl.textContent = strengthchecker.label;
    strengthEl.style.color = strengthchecker.color;
    
    
});




//copy to clipboard when submitted
clipboardEl.addEventListener('click', (e) => {
  e.preventDefault()


  password = resultEl.innerText;

  navigator.clipboard.writeText(password);

    console.log(password);



});

//generate Password function using the charactercodes

function generatePassword(charAmount, LowerCase, UpperCase,Numbers,Symbols) {
    let charCodes = [];
    if(LowerCase) charCodes = charCodes.concat(LOWERCASE_CHAR_CODE)
    if(UpperCase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODE)
    if(Numbers) charCodes = charCodes.concat(NUMBERS_CHAR_CODE)
    if(Symbols) charCodes = charCodes.concat(SYMBOLS_CHAR_CODE)

    const passwordChars = []
    for (let i=0; i< charAmount; i++) {
        const character = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordChars.push(String.fromCharCode(character))
    }
    return passwordChars.join('')


}


//function to get iterate through all the values for the ASCII codes for characters
function arrayLowToHigh(low,high) {
    const array=[]
    for (let i=low; i <= high; i++) {
        array.push(i)
    }
    return array;
}


//strenght check function 
function checkPasswordStrength(password, LowerCase, UpperCase,Numbers,Symbols) {

    let strength = 0;

    if (password.length >= 12) {
      strength += 1;
    } 
    if (password.match(/[A-Z]/) && UpperCase) {
      strength += 1;
    } 
    if (password.match(/[a-z]/) && LowerCase) {
      strength += 1;
    } 
    if (password.match(/[0-9]/) && Numbers) {
      strength += 1;
    } 
    if (password.match(/[$&+,:;=?@#|'<>.^*()%!-]/) && Symbols) {
      strength += 1;
    }

    let label, color;
    switch (strength) {
      case 0:
      case 1:
        label = "WEAK";
        color = "red";
        break;
      case 2:
        label = "MEDIUM";
        color = "orange";
        break;
      case 3:
        label = "BETTER";
        color =  "yellowgreen";
        break;
      case 4:
        label = "STRONG";
        color = "green";
      case 5:
        label = "VERY STRONG";
        color = "rgb(38, 209, 135)";
        break;
    }


    return {label, color};

  }









