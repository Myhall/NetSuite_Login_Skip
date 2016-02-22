function skipNetSuiteLoginInCurrentTab(currentTab)
{
    var currentUrl = currentTab.url;

    console.assert(typeof currentUrl == 'string', 'tab.url should be a string');
    console.log("Updating URL");

    var decodedUrl = decodeURIComponent(currentUrl);
    var newUrl = removeLoginPartFromDecodedUrl(decodedUrl);
    chrome.tabs.update(currentTab.id, {url: newUrl});
}

function removeLoginPartFromDecodedUrl(url)
{
    return url.replace("/pages/login.jsp?rdt=", "");
}

function showPageActionInNetsuiteTab(tabId, selectInfo)
{
    chrome.tabs.get(tabId, function(tab)
    {
        var loginPageRegex = /https:\/\/.*netsuite\.com\/pages\/login\.jsp\?rdt=.*/;
        if(loginPageRegex.test(tab.url))
        {
            chrome.pageAction.show(tabId);
        }
    });
}

chrome.pageAction.onClicked.addListener(function (tab) {skipNetSuiteLoginInCurrentTab(tab);});
chrome.tabs.onSelectionChanged.addListener(showPageActionInNetsuiteTab);
