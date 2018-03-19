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

function getPercents() {
    var percents = {};
    document.querySelectorAll(".scoreElem").forEach(scoreElem => {
        var category = scoreElem.getAttribute("category");

        var pointsReceived = +scoreElem.getAttribute("pointsReceived");
        var totalPoints = +scoreElem.getAttribute("totalPoints");

        //get the additional points from the NewScoreTable
        if(category in addScore) {
            pointsReceived += addScore[category].pointsReceived;
            totalPoints += addScore[category].totalPoints;
        }

        var percent = pointsReceived/totalPoints*100;

        if(!isNaN(percent)) {
            percents[category] = percent;
        }
    });

    return percents;
}

function calculateScore() {
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

function updateScore() {
    var score = calculateScore();

    document.querySelector("#score").textContent = "Grade: " + score + "%";
}
 
