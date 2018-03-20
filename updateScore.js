//NewScoreTable modifies this
//{category: {pointsReceived: , totalPoints: }, otherCategory...}
var addScore = {};

function getWeights() {
    var weights = {};
    document.querySelectorAll(".weightElem").forEach(weightElem => {
        var category = weightElem.getAttribute("category");
        if(!isNaN(+weightElem.textContent)) {
            weights[category] = +weightElem.textContent;
        }
    });

    return weights;
}

function getPointsFromScoreElem(scoreElem, category) {
    var pointsReceived = +scoreElem.getAttribute("pointsReceived");
    var totalPoints = +scoreElem.getAttribute("totalPoints");

    //get the additional points from the NewScoreTable
    if(category in addScore) {
        pointsReceived += addScore[category].pointsReceived;
        totalPoints += addScore[category].totalPoints;
    }

    return {pointsReceived: pointsReceived, totalPoints: totalPoints};
}

function getPercents() {
    var percents = {};
    document.querySelectorAll(".scoreElem").forEach(scoreElem => {
        var category = scoreElem.getAttribute("category");

        var points = getPointsFromScoreElem(scoreElem, category);

        var percent = points.pointsReceived/points.totalPoints*100;

        if(!isNaN(percent)) {
            percents[category] = percent;
        }
    });

    return percents;
}

function calculateWithWeightsScore() {
    var percents = getPercents();
    var weights = getWeights();

    var receivedPercent = 0;
    var totalPercent = 0;

    var categories = Object.keys(weights);
    categories.forEach(category => {
        if(category in percents && category in weights) {
            var percent = percents[category]/100;
            var weight = weights[category]/100;

            receivedPercent += percent*weight;
            totalPercent += weight;
        }
    });

    var unroundedScore = receivedPercent/totalPercent * 100;
    var score = Math.round(unroundedScore * 100) / 100;

    if(isNaN(score)) {
        score = 0;
    }

    return score;
}

function calculateNoWeightScore() {
    var pointsReceived = 0;
    var totalPoints = 0;

    document.querySelectorAll(".scoreElem").forEach(scoreElem => {
        var category = scoreElem.getAttribute("category");
        var points = getPointsFromScoreElem(scoreElem, category);

        if(!isNaN(points.pointsReceived) && !isNaN(points.totalPoints)) {
            pointsReceived += points.pointsReceived;
            totalPoints += points.totalPoints;
        }
    });

    var unroundedScore = pointsReceived/totalPoints*100;
    var score = Math.round(unroundedScore * 100) / 100;

    if(isNaN(score)) {
        score = 0;
    }

    return score;
}

function updateScore() {
    var score = 0;

    //global var created & modified in createTable.js
    if(isWeighted) {
        score = calculateWithWeightsScore();
    }
    else {
        score = calculateNoWeightScore();
    }

    var scoreText;

    if(arguments[0] && "textContent" in arguments[0]) {
        scoreText = arguments[0];
    }
    else {
        scoreText = document.querySelector("#score");
    }

    scoreText.textContent = "Grade: " + score + "%";
}
