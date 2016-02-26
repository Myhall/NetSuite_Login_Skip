var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");

var loginPageRegex = /https:\/\/.*netsuite\.com\/pages\/login\.jsp\?rdt=.*/;

var button = buttons.ActionButton({
                                      id: "skip-netsuite-login",
                                      label: "Skip NetSuite login",
                                      icon: {
                                          "16": "./16_icon.png"
                                      },
                                      onClick: handleClick
                                  });

function handleClick(state) {
    var tab = tabs.activeTab;
    var currentUrl = decodeURIComponent(tab.url);
        console.log("Changing URL. Former was: " + currentUrl);
        tab.url = removeLoginPartFromDecodedUrl(currentUrl);
}

function removeLoginPartFromDecodedUrl(url)
{
    return url.replace("/pages/login.jsp?rdt=", "");
}

tabs.on("activate", function(tab) {
    var areWeOnNSLoginPage = loginPageRegex.test(tab.url);
    console.log("Changing button state to: " + areWeOnNSLoginPage);
    button.state("tab", {
        disabled : !areWeOnNSLoginPage
    })
});