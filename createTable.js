function createTable(grades, weights) {
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
        var row = createRowFromCategory(category, grades, weights);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    insertTable(table);
}

function createRowFromCategory(category, grades, weights) {
    var row = document.createElement("tr");

    var categoryElem = document.createElement("td");
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

function onlyNumbers(event) {
    if(((event.which != 46 && event.which != 190) || this.textContent.indexOf('.') != -1) && (event.which < 48 || event.which > 57) && event.which != 8 && event.which != 127 && event.which != 37 && event.which != 39) {
        event.preventDefault();
    }
}

function insertTable(table) {
    var parentNode = document.getElementsByClassName("box-round")[0];

    insertName(parentNode);
    parentNode.insertBefore(table, parentNode.children[6]);
    insertScore(parentNode);

    parentNode.insertBefore(document.createElement("br"), parentNode.children[8]);
}

function insertName(parentNode) {
    var name = document.createElement("h2");
    name.textContent = "Will I Fail?";

    parentNode.insertBefore(name, parentNode.children[5]);
}

function insertScore(parentNode) {
    var score = document.createElement("h3");
    score.setAttribute("id", "score");
    score.textContent = "Grade: " + calculateScore() + "%";

    parentNode.insertBefore(score, parentNode.children[7]);
}

