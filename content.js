console.log("content js loaded");

function setMarginPct(numberLeft, numberRight) {
    document.body.style.marginLeft = numberLeft + "%";
    document.body.style.marginRight = numberRight + "%";
}

function hackerNews() {
    document.removeEventListener("DOMContentLoaded", hackerNews, false);
    if (document.domain == "news.ycombinator.com") {
        for (var i = 0; i <= document.getElementsByClassName("title").length; i++) {
            document.getElementsByClassName("title")[i].style.fontSize = "24px";
        }
    }
}

document.addEventListener("DOMContentLoaded", hackerNews, false);


function nextPage() {
    window.location.href = document.getElementById('pagnNextLink').href;
};


// adds 25% margins, increases font-sizes on class=title on news.ycombinator.com
// based on example
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.backgroundClick == true) {
            setMarginPct(25, 25);

            if (document.domain == "news.ycombinator.com") {

                for (var i = 0; i <= document.getElementsByClassName("title").length; i++) {
                    document.getElementsByClassName("title")[i].style.fontSize = "24px";
                }
            }

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