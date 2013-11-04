console.log("content js loaded");

function nextPage() {

    window.location.href = document.getElementById('pagnNextLink').href;

};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.backgroundClick == true) {
            document.body.style.marginLeft = "25%";
            document.body.style.marginRight = "25%";

            if (document.domain == "news.ycombinator.com") {

                for (var i = 0; i <= document.getElementsByClassName("title").length; i++) {
                    document.getElementsByClassName("title")[i].style.fontSize = "24px";
                }
            }

            sendResponse({result: "content.js processed backgroundClick == true"});
        }
    });