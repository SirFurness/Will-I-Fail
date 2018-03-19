function onlyNumbers(event) {
    if(!isValidDecimal(event, this) && !isValidNumber(event) && !isValidSpecialInput(event)) {
        event.preventDefault();
    }
}

function isValidDecimal(event, elem) {
    return ((event.which == 46 || event.which == 190) && elem.textContent.indexOf('.') == -1);
}

function isValidNumber(event) {
    return (event.which >= 48 && event.which <= 57);
}

function isValidSpecialInput(event) {
    return (event.which == 8 || //backspace
            event.which == 127 || //delete
            event.which == 37 || //left arrow
            event.which == 39); //right arrow
}
