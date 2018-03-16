var numericInputUpdates = {};

function createNumericInputObserver() {
    var observer = new MutationObserver(numericMutationCallback);

    return observer;
}

function addSelectorToNumericInputObserver(observer, selector, update) {
    var config = {childList: true, characterData: true, characterDataOldValue: true, subtree: true};

    document.querySelectorAll(selector).forEach(elem => observer.observe(elem, config));
    numericInputUpdates[selector] = update;
}

function numericMutationCallback(mutationList) {
    mutationList.forEach(mutation => {
        if(mutation.type === "childList") {
            numericChildListMutation(mutation);
        }
        else if(mutation.type === "characterData") {
            numericCharacterDataMutation(mutation);
        }
    });
}

function numericChildListMutation(mutation) {
    if(mutation.target.childNodes.length < 2) {
        return;
    }

    var oldData = "";
    mutation.addedNodes.forEach(node => {
        oldData += node.textContent;
        mutation.target.removeChild(node);
    });
    mutation.target.childNodes[0].textContent = oldData + mutation.target.childNodes[0].textContent;
}

function numericCharacterDataMutation(mutation) {
    var newValue = mutation.target.data;
    var oldValue = mutation.oldValue;

    if(newValue !== "" && newValue.match(/[^\d]/g)) {
        mutation.target.textContent = oldValue;
    }
    else {
        updateNumericInput(mutation);
    }
}

function updateNumericInput(mutation) {
    //when all the text is deleted the parentElement does not exist
    if(mutation.target.parentElement !== null) {
        //call the update function associated with that class
        numericInputUpdates["."+mutation.target.parentElement.getAttribute("class")]();
    }
}
