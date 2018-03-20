function createTable(grades, weights) {
    var table = document.createElement("table");
    table.setAttribute("class", "zebra grid table");
    table.setAttribute("id", "weightTable");

    var thead = document.createElement("thead");

    var headerRow = document.createElement("tr");
    headerRow.setAttribute("bgcolor", "#f6f6f6");

    var categoryCol = document.createElement("th");
    categoryCol.textContent = "Category";

    var weightCol = document.createElement("th");
    weightCol.setAttribute("id", "weightCol");
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
        var row = createRowFromCategory(category, grades, weights);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    insertTable(table);

    //is weights an empty object
    if(Object.keys(weights).length === 0 && weights.constructor === Object) {
        disableWeights();
    }
    else {
        document.querySelector("#useWeights").checked = true;
        enableWeights();
        updateScore();
    }

}

var isWeighted = false;

function disableWeights() {
    document.querySelector("#weightCol").setAttribute("style", "display:none");

    document.querySelectorAll(".weightElem").forEach(scoreElem => {
        scoreElem.setAttribute("style", "display:none");
    });

    //global var
    isWeighted = false;
}

function enableWeights() {
    document.querySelector("#weightCol").setAttribute("style", "");

    document.querySelectorAll(".weightElem").forEach(scoreElem => {
        scoreElem.setAttribute("style", "");
    });

    //global var
    isWeighted = true;
}

function createRowFromCategory(category, grades, weights) {
    var row = document.createElement("tr");

    var categoryElem = document.createElement("td");
    categoryElem.setAttribute("style", "width: 20%");
    categoryElem.textContent = category;

    var weightElem = document.createElement("td");
    weightElem.setAttribute("contenteditable", "true");
    weightElem.setAttribute("align", "center");
    weightElem.setAttribute("class", "weightElem");
    weightElem.setAttribute("category", category);
    weightElem.textContent = 100;
    if(category in weights) {
        weightElem.textContent = weights[category];
    }

    weightElem.addEventListener("keydown", onlyNumbers);
    weightElem.addEventListener("keyup", updateScore);

    var pointsReceived = grades[category].pointsReceived;
    var totalPoints = grades[category].totalPoints;

    var scoreElem = document.createElement("td");
    scoreElem.setAttribute("align", "center");
    scoreElem.setAttribute("class", "scoreElem");
    scoreElem.setAttribute("category", category);
    scoreElem.setAttribute("pointsReceived", pointsReceived);
    scoreElem.setAttribute("totalPoints", totalPoints);
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
    percentElem.setAttribute("class", "percentElem");
    percentElem.setAttribute("category", category);
    percentElem.textContent = pointPercent;

    row.appendChild(categoryElem);
    row.appendChild(weightElem);
    row.appendChild(scoreElem);
    row.appendChild(percentElem);

    return row;
}

function insertTable(table) {
    var parentNode = document.getElementsByClassName("box-round")[0];

    var position = 5;

    insertName(parentNode, position);
    position++;

    insertCheckbox(parentNode, position);
    position += 2;

    parentNode.insertBefore(table, parentNode.children[position]);
    position++;

    insertScore(parentNode, position);
    position++;

    parentNode.insertBefore(document.createElement("br"), parentNode.children[position]);
    position++;
}

function insertCheckbox(parentNode, position) {
    var checkbox = document.createElement("input");
    checkbox.setAttribute("style", "margin: 0px 10px 15px 20px");

    checkbox.addEventListener("change", function() {
        if(this.checked) {
            enableWeights();
        }
        else {
            disableWeights();
        }
        updateScore();
    });

    checkbox.type = "checkbox";
    checkbox.name = "useWeights";
    checkbox.value = "useWeights";
    checkbox.id = "useWeights";

    if(isWeighted) {
        checkbox.checked = true;
    }

    var label = document.createElement("label");
    label.htmlFor = "useWeights";
    label.appendChild(document.createTextNode("Use Weights"));

    parentNode.insertBefore(checkbox, parentNode.children[position]);
    position++;
    parentNode.insertBefore(label, parentNode.children[position]);
}

function insertName(parentNode, position) {
    var name = document.createElement("h2");
    name.textContent = "Will I Fail?";

    parentNode.insertBefore(name, parentNode.children[position]);
}

function insertScore(parentNode, position) {
    var score = document.createElement("h3");
    score.setAttribute("id", "score");
    updateScore(score);

    parentNode.insertBefore(score, parentNode.children[position]);
}

