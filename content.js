chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction'
});

function getPointsFromRow(row, grades) {

    var category = row.childNodes[3].innerText;

    grades[category] = grades[category] || {
        pointsReceived: 0,
        totalPoints: 0
    };

    var gradeStr = row.childNodes[23].innerText;

    var pointsReceived;
    var totalPoints;

    // "20/20" -> ["20", "20"]
    var splitGrades = gradeStr.split('/');

    if(splitGrades[0] === "--") {
        grades[category].pointsReceived += 0;
        grades[category].totalPoints += 0;
    }
    else {
        grades[category].pointsReceived += parseInt(splitGrades[0]);
        grades[category].totalPoints += parseInt(splitGrades[1]);
    }
}

function getRows() {
    var rows = document.querySelectorAll("tr[data-ng-repeat-start='studentAssignment in studentAssignmentScoresCtrlData.studentAssignments']");

    return rows;
}

function getGrades() {
    var grades = {};
    getRows().forEach(row => getPointsFromRow(row, grades));

    return grades;
}

chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    if ((msg.from === 'popup') && (msg.subject === 'grades')) {
        response(getGrades());
    }
});
