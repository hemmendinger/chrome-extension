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


function eveDataCentral() {
    document.removeEventListener("DOMContentLoaded", eveDataCentral, false);

    // uses jQuery
    if (document.domain == "eve-central.com") {
        function getISK(cellStr, sellOrBuyInt) {
            //var cellStr = $(cell).text();
            //var cellStr = node.textContent();
            cellStr = cellStr.substring(sellOrBuyInt);
            var stop = cellStr.indexOf(' ');
            cellStr = cellStr.substring(0, stop);
            cellStr = cellStr.replace(/,/g, "");
            return parseFloat(cellStr);
        }

        //var selling = $("tr td:has(b):contains('Selling')");
        //var buying =  $("tr td:has(b):contains('Buying')");
        var sellInt = 9;
        var buyInt = 8;
        var limit = document.getElementsByName('limit')[0].value;
        limit = parseInt(limit);
        var nodes = document.getElementsByTagName('tr');

        for (var i = 0; i < limit*5; i+=5) {
            var rowNode = nodes[i+1];
            var tdNodes = rowNode.getElementsByTagName('td');
            var selling = tdNodes[1].textContent;
            var buying = tdNodes[2].textContent;
            var buyPrice = getISK(selling, sellInt);
            var sellPrice = getISK(buying, buyInt);
            var pctDifference = ( (sellPrice - buyPrice) / sellPrice);
            var td = document.createElement('td');
            var cellStr = function(){

                var classColor = '';

                if (pctDifference < .05) {
                    td.style.color = 'grey';
                }
                else if (pctDifference >= .05 && pctDifference <= .07) {
                    td.style.color = 'purple';
                }
                else {
                    td.style.color = 'green';
                }
                return '<span class="' + classColor + '"><b>% Gain:</b> ' + pctDifference + '</span>';
            }
            td.innerHTML = cellStr();
            rowNode.appendChild(td);
        }
        td.className
    }
}

document.addEventListener("DOMContentLoaded", eveDataCentral, false);

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
    if (true) {
        console.log('copying');
        var selectionObj = document.getSelection();
        var selection = selectionObj.toString()
        chrome.runtime.sendMessage({
            selectedText: selection
        }, function(response) {

        });
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
            window.addEventListener("copy", copyHandler, false);
            console.log('adding event listener copy');
        }
        else {
            // remove listener
            window.removeEventListener("copy", copyHandler, false);
            console.log('removing event listener copy');
        }
    }
});
