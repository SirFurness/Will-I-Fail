function createTable(grades) {
    var table = document.createElement("table");
    table.setAttribute("class", "zebra grid table");

    var thead = document.createElement("thead");

    var headerRow = document.createElement("tr");
    headerRow.setAttribute("bgcolor", "#f6f6f6");

    var categoryCol = document.createElement("th");
    categoryCol.textContent = "Category";

    var weightCol = document.createElement("th");
    weightCol.textContent = "Weight % (Click to Edit)";

    var scoreCol = document.createElement("th");
    scoreCol.textContent = "Score";

    var percentCol = document.createElement("th");
    percentCol.textContent = "%";

    headerRow.appendChild(categoryCol);
    headerRow.appendChild(weightCol);
    headerRow.appendChild(scoreCol);
    headerRow.appendChild(percentCol);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");

    var categories = Object.keys(grades);
    categories.forEach(function(category) {
        var row = createRowFromCategory(category, grades);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    insertTable(table);
    observeWeightElems();
}

function createRowFromCategory(category, grades) {
    var row = document.createElement("tr");

    var categoryElem = document.createElement("td");
    categoryElem.textContent = category;

    var weightElem = document.createElement("td");
    weightElem.setAttribute("contenteditable", "true");
    weightElem.setAttribute("align", "center");
    //only allow numbers
    //weightElem.setAttribute("onKeypress", "if(event.keyCode<48||event.keyCode>57){return false;}");
    weightElem.setAttribute("class", "weightElem");
    weightElem.textContent = 100;

    var pointsReceived = grades[category].pointsReceived;
    var totalPoints = grades[category].totalPoints;

    var scoreElem = document.createElement("td");
    scoreElem.setAttribute("align", "center");
    scoreElem.textContent = pointsReceived + "/" + totalPoints;

    var pointPercentUnrounded = pointsReceived/totalPoints*100;
    var pointPercent = Math.round(pointPercentUnrounded * 100) / 100;

    //handles case of totalPoints being 0 (dividing by 0)
    //can't use OR operator as 0 is a possible pointPercent
    if(isNaN(pointPercent)) {
        pointPercent = "--";
    }

    var percentElem = document.createElement("td");
    percentElem.setAttribute("align", "center");
    percentElem.textContent = pointPercent;

    row.appendChild(categoryElem);
    row.appendChild(weightElem);
    row.appendChild(scoreElem);
    row.appendChild(percentElem);

    return row;
}

function insertTable(table) {
    var parentNode = document.getElementsByClassName("box-round")[0];

    insertName(parentNode);
    parentNode.insertBefore(table, parentNode.children[6]);
}

function insertName(parentNode) {
    var name = document.createElement("h2");
    name.textContent = "Will I Fail?";

    parentNode.insertBefore(name, parentNode.children[5]);
}

function observeWeightElems() {
    var config = {childList: true, characterData: true, characterDataOldValue: true, subtree: true};

    var observer = new MutationObserver(weightMutationCallback);

    document.querySelectorAll(".weightElem").forEach(elem => observer.observe(elem, config));
}

function weightMutationCallback(mutationList) {
    mutationList.forEach(mutation => {
        if(mutation.type === "childList") {
            weightChildListMutation(mutation);
        }
        else if(mutation.type === "characterData") {
            weightCharacterDataMutation(mutation);
        }
    });
}

function weightChildListMutation(mutation) {
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

function weightCharacterDataMutation(mutation) {
    var newValue = mutation.target.data;
    var oldValue = mutation.oldValue;

    if(newValue !== "" && newValue.match(/[^\d]/g)) {
        mutation.target.textContent = oldValue;
    }
}
