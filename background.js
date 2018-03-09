console.log("active")
chrome.runtime.onMessage.addListener(function (msg, sender) {
    console.log("received: " + msg);
    if ((msg.from === 'content') && (msg.subject === "showPageAction")) {
        chrome.pageAction.show(sender.tab.id);
    }
});
