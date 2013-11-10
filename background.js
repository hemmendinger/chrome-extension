console.log("background.js loaded");


function onClickedMenuItemHandler(info, tab) {
    if (info.menuItemId == "margin25pct") {
        var activeBoolean = true;
        var currentWindowBoolean = true;
        sendMessageToContent(info.menuItemId, tab, activeBoolean, currentWindowBoolean);
    }
    else if (info.menuItemId == "zoom150pct") {
        var activeBoolean = true;
        var currentWindowBoolean = true;
        sendMessageToContent(info.menuItemId, tab, activeBoolean, currentWindowBoolean);
    }
    else if (info.menuItemId == "flatten") {
        var activeBoolean = true;
        var currentWindowBoolean = true;
        sendMessageToContent(info.menuItemId, tab, activeBoolean, currentWindowBoolean);
    }
    else if (info.menuItemId == "copy") {
        var activeBoolean = true;
        var currentWindowBoolean = true;
        checkableContextMenuMessage(info, tab, activeBoolean, currentWindowBoolean);
    }
}


function sendMessageToContent(menuItemId, tab, activeBoolean, currentWindowBoolean) {
    chrome.tabs.query({active: activeBoolean, currentWindow: currentWindowBoolean}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {clicked: menuItemId}, function(response) {
            console.log(response.result);
        });
    });
}

// for checkable contextmenuitems
function checkableContextMenuMessage(info, tab, activeBoolean, currentWindowBoolean) {
    chrome.tabs.query({active: activeBoolean, currentWindow: currentWindowBoolean}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {clicked: info.menuItemId, wasChecked: info.wasChecked}, function(response) {
            console.log(response.result);
        });
    });
}

chrome.browserAction.onClicked.addListener(function (){
    console.log("browser action clicked");

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {backgroundClick: true}, function(response) {
            console.log(response.result);
        });
    });
});


// contextMenus
chrome.contextMenus.onClicked.addListener(onClickedMenuItemHandler);

chrome.contextMenus.create({
    "title": "Set left and right margins to 25%",
    "type": "normal",
    "id": "margin25pct",
    "contexts": ["page"],
    "enabled": true
});

chrome.contextMenus.create({
    "title": "Zoom: 150%",
    "type": "normal",
    "id": "zoom150pct",
    "contexts": ["page"],
    "enabled": true
});

chrome.contextMenus.create({
    "title": "Flatten page",
    "type": "normal",
    "id": "flatten",
    "contexts": ["page"],
    "enabled": true
});

chrome.contextMenus.create({
    "title": "Cleanly copy text",
    "type": "checkbox",
    "id": "copy",
    "contexts": ["page"],
    "enabled": true,
    "checked": false
});

// handling messages from content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
   if (request.selectedText) {
       selectionObj = request.selectedText;
       var selection = selectionObj.toString();

       holderElement = document.createElement('div');
       holderElement.className = 'text_holder';
       var txt = selection;
       holderElement.appendChild(txt);


       document.execCommand('copy');
   }
});