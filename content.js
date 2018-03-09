chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction'
}
);

function getGrades() {
    var gradesStr = document.querySelectorAll("span[data-ng-if*='studentAssignment._']");

    var points = 0;
    var totalPoints = 0;

    gradesStr.forEach(function(elem) {
        gradeStr = elem.textContent;

        // "20/20" -> ["20", "20"] (removes the weird spacing and newlines)
        splitGrades = gradeStr.split('/').map(x => x.replace(/[ \n]/g, ""));

        if(splitGrades[0] === "--") {
            return
        }

        points += parseInt(splitGrades[0]);
        totalPoints += parseInt(splitGrades[1]);
    });

    var gradesObj = {
        points: points,
        totalPoints: totalPoints
    };
    console.log(gradesObj);
    return gradesObj;
}

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    if ((msg.from === 'popup') && (msg.subject === 'grades')) {
        response(getGrades());
    }
});
