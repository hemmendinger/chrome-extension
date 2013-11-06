console.log("content js loaded");


// utility functions
function setMarginPct(numberLeft, numberRight) {
    document.body.style.marginLeft = numberLeft + "%";
    document.body.style.marginRight = numberRight + "%";
}


// domain specific handlers
function hackerNewsHandler() {
    document.removeEventListener("DOMContentLoaded", hackerNewsHandler, false);
    if (document.domain == "news.ycombinator.com") {
        setMarginPct(25, 25);
        for (var i = 0; i <= document.getElementsByClassName("title").length; i++) {
            document.getElementsByClassName("title")[i].style.fontSize = "24px";
        }
    }
}

document.addEventListener("DOMContentLoaded", hackerNewsHandler, false);


function amazonHandler() {
    document.removeEventListener("DOMContentLoaded", amazonHandler(), false);
    if (document.domain == "www.amazon.com") {

        window.addEventListener("keydown", function(event){
            if (event.ctrlKey && (event.which == 39)) {
                window.location.href = document.getElementById('pagnNextLink').href;
            }
        }, false);
    }
}

document.addEventListener("DOMContentLoaded", amazonHandler, false);


// clicking icon behavior: adds 25% margins
// based on example
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.backgroundClick == true) {
            setMarginPct(25, 25);
            sendResponse({result: "content.js processed backgroundClick == true"});
        }
    });


// create 25% left and right margins --- initiated via contextMenu
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.clicked == "margin25pct") {
        document.body.style.marginLeft = "25%";
        document.body.style.marginRight = "25%";
    };
});