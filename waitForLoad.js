waitForLoad();
function waitForLoad() {
    var targetNode = document.querySelector(".xteContentWrapper");
    var config = {characterData: true, subtree: true};

    var callback = function (mutationList) {
        this.disconnect();
        main();
    };

    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}
