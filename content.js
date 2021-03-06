function main() {
    var grades = getGrades();
    var weights = getDefaultWeights();
    createTable(grades, weights);
    createNewScoreTable(Object.keys(grades));
}

function getDefaultWeights() {
    var info = document.querySelector(".linkDescList").children[0].children[1].children;
    var courseName = info[0].textContent;
    var teacherName = info[1].textContent;

    var defaultWeights = {"Gettman, David":
                          {"Physics (P)":
                           {"Whiteboards": 25,
                            "Labs and Activities": 25,
                            "Tests and Quizzes": 45,
                            "Notebook": 5}}};

    return (defaultWeights[teacherName] ? (defaultWeights[teacherName][courseName] || {}) : {});
}

// modifies grades argument
function getPointsFromRow(row, grades) {

    var category = row.childNodes[3].innerText;

    grades[category] = grades[category] || {
        pointsReceived: 0,
        totalPoints: 0
    };

    var gradeStr = row.childNodes[23].innerText;

    // "20/20" -> ["20", "20"]
    var splitGrades = gradeStr.split('/');

    if(splitGrades[0] === "--") {
        grades[category].pointsReceived += 0;
        grades[category].totalPoints += 0;
    }
    else {
        // unary plus converts it to a number
        grades[category].pointsReceived += +splitGrades[0];
        grades[category].totalPoints += +splitGrades[1];
    }
}

function getRows() {
    var rows = document.querySelectorAll("tr[data-ng-repeat-start='studentAssignment in studentAssignmentScoresCtrlData.studentAssignments']");

    return rows;
}

function getGrades() {
    // is populated by getPointsFromRow
    var grades = {};
    getRows().forEach(row => getPointsFromRow(row, grades));

    return grades;
}
