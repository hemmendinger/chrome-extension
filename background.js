console.log("background.js loaded");

chrome.browserAction.onClicked.addListener(function (){
    console.log("browser action clicked");

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {backgroundClick: true}, function(response) {
            console.log(response.farewell);
        });
    });
});


