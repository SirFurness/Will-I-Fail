function getPointsReceived() {
    var pointsReceivedElems = document.querySelectorAll(".pointsReceivedElem");

    var pointsReceived = {};

    pointsReceivedElems.forEach(elem => {
        var category = elem.getAttribute("category");

        if(!isNaN(+elem.textContent)) {
            console.log(+elem.textContent);
            pointsReceived[category] = +elem.textContent;
        }
    });

    return pointsReceived;
}
function getTotalPoints() {
    var totalPointsElems = document.querySelectorAll(".totalPointsElem");

    var totalPoints = {};

    totalPointsElems.forEach(elem => {
        var category = elem.getAttribute("category");

        if(!isNaN(+elem.textContent)) {
            totalPoints[category] = +elem.textContent;
        }
    });

    return totalPoints;
}

function updateAddedScore() {
    var pointsReceived = getPointsReceived();
    var totalPoints = getTotalPoints();

    var categories = Object.keys(totalPoints);
    categories.forEach(category => {
        if(category in pointsReceived && category in totalPoints) {
            addScore[category] = {};
            addScore[category].pointsReceived = pointsReceived[category];
            addScore[category].totalPoints = totalPoints[category];
        }
    });

    updateScore();
}
