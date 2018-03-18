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
    document.querySelectorAll(".percentElem").forEach(percentElem => {
        var category = percentElem.getAttribute("category");
        if(!isNaN(+percentElem.textContent)) {
            percents[category] = +percentElem.textContent;
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
        var percent = percents[category]/100;
        var weight = weights[category]/100;

        receivedPercent += percent*weight;
        totalPercent += weight;
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
 
