console.log("background.js loaded");


function onClickedMenuItemHandler(info, tab) {
    if (info.menuItemId == "margin25pct") {
        var active = true;
        var currentWindow = true;
        sendMessageToContent(menuItemId, tab, activeBoolean, currentWindowBoolean);
    };
};

function sendMessageToContent(menuItemId, tab, activeBoolean, currentWindowBoolean) {
    chrome.tabs.query({active: activeBoolean, currentWindow: currentWindowBoolean}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {clicked: menuItemId}, function(response) {
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


