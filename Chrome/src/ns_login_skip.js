const replaceRegex = /\/app\/login\/secure\/enterpriselogin\.nl\?(c=.+)?&?redirect=/;
const loginPageRegex = /https:\/\/.*netsuite\.com\/app\/login\/secure\/enterpriselogin\.nl.*/;

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
    return url.replace(replaceRegex, "");
}

function showPageActionInNetsuiteTab(tabId, selectInfo)
{
    chrome.tabs.get(tabId, function(tab)
    {
        if(loginPageRegex.test(tab.url))
        {
            chrome.pageAction.show(tabId);
        }
    });
}

chrome.pageAction.onClicked.addListener(
	function (tab) {
		skipNetSuiteLoginInCurrentTab(tab);
	});
chrome.tabs.onSelectionChanged.addListener(showPageActionInNetsuiteTab);
