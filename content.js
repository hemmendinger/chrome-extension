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
    document.removeEventListener("DOMContentLoaded", amazonHandler, false);
    if (document.domain == "www.amazon.com") {
        window.addEventListener("keydown", function(event) {
            // key combo: CTRL + right arrow
            if (event.ctrlKey && (event.which == 39)) {
                window.location.href = document.getElementById('pagnNextLink').href;
            }
        }, false);
    }
}

document.addEventListener("DOMContentLoaded", amazonHandler, false);


// icon click behavior: adds 25% margins (based on example)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.backgroundClick == true) {
            setMarginPct(25, 25);
            sendResponse({result: "content.js processed backgroundClick == true"});
        }
});

// select text, copy text protection


function copyHandler() {
    // key combo: CTRL + c
    if (event.ctrlKey && (event.which == 86)) {
        var selection = window.getSelection();
        copy(selection);
    }
}


// initiated via contextMenu: margin 25%, zoom 150%
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.clicked == "margin25pct") {
        setMarginPct(25, 25);
    }
    else if (request.clicked == "zoom150pct") {
        document.body.style.zoom = "150%";
    }
    else if (request.clicked == "flatten") {
        var d = document.createElement('div');
        d.innerHTML = '\
            <style>\
                *:not(.icon):not(i), *:not(.icon):not(i):after, *:not(.icon):not(i):before {\
                    box-shadow: none !important;\
                    text-shadow: none !important;\
                    background-image: none !important;\
                }\
                *:not(.icon):not(i) {\
                    border-color: transparent !important;\
                }\
            </style>\
            ';
        document.body.appendChild(d);
    }
    else if (request.clicked == "copy") {
        if (request.wasChecked == false) {
            // add listener handler
            window.addEventListener("keydown", copyHandler, false);
            console.log('adding event listener copy');
        }
        else {
            // remove listener
            window.addRemoveListener("keydown", copyHandler, false);
            console.log('removing event listener copy');
        }
    }
});
