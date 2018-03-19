function createNewScoreTable(categories) {
    var table = document.createElement("table");
    table.setAttribute("class", "zebra grid table");

    var thead = document.createElement("thead");

    var headerRow = document.createElement("tr");
    headerRow.setAttribute("bgcolor", "#f6f6f6");

    var categoryCol = document.createElement("th");
    categoryCol.textContent = "Category";

    var pointsReceivedCol = document.createElement("th");
    pointsReceivedCol.textContent = "Points Received (Click to Edit)";

    var totalPointsCol = document.createElement("th");
    totalPointsCol.textContent = "Total Points (Click to Edit)";

    headerRow.appendChild(categoryCol);
    headerRow.appendChild(pointsReceivedCol);
    headerRow.appendChild(totalPointsCol);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");

    categories.forEach(function(category) {
        var row = document.createElement("tr");

        var categoryElem = document.createElement("td");
        categoryElem.textContent = category;

        var pointsReceivedElem = document.createElement("td");
        pointsReceivedElem.setAttribute("contenteditable", "true");
        pointsReceivedElem.setAttribute("align", "center");
        pointsReceivedElem.setAttribute("class", "pointsReceivedElem");
        pointsReceivedElem.setAttribute("category", category);
        pointsReceivedElem.textContent = 0;

        pointsReceivedElem.addEventListener("keydown", onlyNumbers);
        pointsReceivedElem.addEventListener("keyup", updateAddedScore);

        var totalPointsElem = document.createElement("td");
        totalPointsElem.setAttribute("contenteditable", "true");
        totalPointsElem.setAttribute("align", "center");
        totalPointsElem.setAttribute("class", "totalPointsElem");
        totalPointsElem.setAttribute("category", category);
        totalPointsElem.textContent = 0;

        totalPointsElem.addEventListener("keydown", onlyNumbers);
        totalPointsElem.addEventListener("keyup", updateAddedScore);

        row.appendChild(categoryElem);
        row.appendChild(pointsReceivedElem);
        row.appendChild(totalPointsElem);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    insertNewScoreTable(table);
}

function insertNewScoreTable(table) {
    var parentNode = document.getElementsByClassName("box-round")[0];

    parentNode.insertBefore(table, parentNode.children[7]);
}
