mapall(["A", "<Ctrl-a>", "H"], "E"); // prev tab
mapall(["D", "L", "<Ctrl-d>"], "R"); // next tab
mapall(["gx^", "gx6"], "gx0"); // close tabs to left. ^ is regex 'beginning of line' char and also capital 6

map("<Ctrl-s>", "J"); map("<Ctrl-w>", "K"); // scroll page up and down
map("w", "k"); map("s", "j"); 
map("h", "a"); map("l", "d"); // history back/forward
map("=", "z="); map("-", "z-"); // zoom in and out 
map("gx4", "gx$"); // close all tabs to the right. $ is regex 'end of line' char and capital 4


Hints.scrollKeys = "0jk";
settings.autoFocus = false;
settings.richHintsForKeystroke = 300;
settings.omnibarMaxResults = 20;
settings.omnibarSuggestion = true;
settings.tabThreshold = 20;

settings.scrollStepSize = 150;
settings.focusFirstCandidate = true;
settings.hintThreshold = 50;
settings.interceptedErrors = ["*"];

addSearchAlias('jira', 'JIRA RES', 'https://jira.dev.lithium.com/secure/QuickSearch.jspa?searchString=');
addSearchAlias('board', 'JIRA Board', 'https://jira.dev.lithium.com/secure/RapidBoard.jspa?project=');

var base = "https://dev-lswcore-jenkins-master.dev.aws.lcloud.com";
addSearchAlias("job", "Jenkins Job", `${base}/job/`, `${base}/search/suggest?query=`, function (response) {
    var res = JSON.parse(response.text);
    var suggestions = res.suggestions ? res.suggestions.map(s => s.name) : [];
    suggestions = suggestions.map(s => s.replace(/\s/g, "/job/"));
    console.log(suggestions);

    return suggestions || [];
});

/* TODO:
- JIRA search
- JIRA board
- Jenkins autocomplete


*/