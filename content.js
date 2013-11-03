console.log("content js loaded");

function nextPage() {

    window.location.href = document.getElementById('pagnNextLink').href;

};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.backgroundClick == true)
            sendResponse({result: "content.js processed backgroundClick == true"});
    });