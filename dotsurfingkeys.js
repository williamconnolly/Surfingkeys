mapall(["A", "<Ctrl-a>", "H", ","], "E"); // prev tab
mapall(["D", "L", "<Ctrl-d>", "."], "R"); // next tab
mapall(["gx^", "gx6"], "gx0"); // close tabs to left. ^ is regex 'beginning of line' char and also capital 6

map("<Ctrl-s>", "J");
map("<Ctrl-w>", "K"); // scroll page up and down
map("w", "k");
map("s", "j");
map("h", "a");
map("l", "d"); // history back/forward
map("=", "z=");
map("-", "z-"); // zoom in and out 
map("gx4", "gx$"); // close all tabs to the right. $ is regex 'end of line' char and capital 4

iunmap(":");  // disable stupid ass emoji picker


mapkey('<Space>', 'Choose a tab with omnibar', function() {
    Front.openOmnibar({type: "Tabs"});
});


settings.autoFocus = true;
settings.richHintsForKeystroke = 300;
settings.omnibarMaxResults = 20;
settings.omnibarSuggestion = true;
settings.tabThreshold = 20;

settings.scrollStepSize = 150;
settings.focusFirstCandidate = true;
settings.hintThreshold = 50;
settings.interceptedErrors = [];

/**
 * Utility functions
 */
const getNested = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);

mapkey("gs", "#14Scroll to StackOverflow answers", function () {
    var host = document.location.host;
    var top = -1;
    if (host.match(/reddit/)) {
        top = document.querySelector(".commentarea > .sitetable").offsetTop + 200;
    } else if (host.match(/stackoverflow/)) {
        top = document.querySelector("#answers-header").offsetTop + 30;
    }
    window.scroll({
        behavior: 'smooth',
        top: top
    });
});

mapkey("gmp", "#14Go to most popular", function() {
    if (document.location.href.match(/youtube/i)) {
        document.location.search = "?view=0&sort=p&flow=grid";
    }
});

mapkey("gr", "#14Toggle between Continuous and Release jobs", function() {
    var href = document.location.href;
    if (href.match(/jenkins/i)) {
        document.location.href = href.match(/continuous/i) ?
            href.replace("continuous", "release") :
            href.replace("release", "continuous");
    } else if (href.match(/github/i)) {
        document.location.href = href.match(/ic-backend-ui/i) ?
            href.replace("ic-backend-ui", "ic-backend") :
            href.replace("ic-backend", "ic-backend-ui");
    }
});


var jira = 'https://jira.dev.lithium.com/';

// addSearchAlias('jira', 'JIRA RES', `${jira}/secure/QuickSearch.jspa?searchString=`);
addSearchAlias('board', 'JIRA Board', `${jira}/secure/RapidBoard.jspa?project=`);

var base = "https://dev-lswcore-jenkins-master.dev.aws.lcloud.com";
addSearchAlias("job", "Jenkins Job", `${base}/job/`, `${base}/search/suggest?query=`, function (response) {
    var res = JSON.parse(response.text);
    var suggestions = res.suggestions ? res.suggestions.map(s => s.name) : [];
    suggestions = suggestions.map(s => s.replace(/\s/g, "/job/"));
    console.log(suggestions);

    return suggestions || [];
});

addSearchAlias("jira", "JIRA Search", `${jira}/browse/`, `${jira}/rest/quicksearch/1.0/productsearch/search?q=`, function (response) {
    var res = JSON.parse(response.text);
    var suggestions = getNested([0, 'items'], res) || [];
    suggestions = suggestions.map(({
        title,
        subtitle,
        url
    }) => `${subtitle}: ${title}`);
    console.log(suggestions);
    return suggestions;
});

const saveKeys = ['<Ctrl-a>', '<Ctrl-d>', 'a', 'd', 't', 'x', 'w', 's', 'gg', 'G', 'i'];
unmapAllExcept(saveKeys, /amazon/i);
unmapAllExcept(['gmp', ...saveKeys], /youtube/i);
unmapAllExcept(saveKeys, /slack/i);
unmapAllExcept(saveKeys, /reddit/i);
unmap('t', /github\.com/i);
unmapAllExcept(['<Ctrl-a>', '<Ctrl-d>'], /google/i);

/* TODO:
- JIRA search
- JIRA board
- Jenkins autocomplete


*/
