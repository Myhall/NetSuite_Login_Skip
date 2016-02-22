function skipNetSuiteLoginInCurrentTab(currentTab) {
    var currentUrl = currentTab.url;

    console.assert(typeof currentUrl == 'string', 'tab.url should be a string');
	console.log("Updating URL");

    var decodedUrl = decodeURIComponent(currentUrl);
    var newUrl = removeLoginPartFromDecodedUrl(decodedUrl);
	chrome.tabs.update(currentTab.id, {url: newUrl});
}

function removeLoginPartFromDecodedUrl(url) {
    var urlWithoutLogin = url.replace("/pages/login.jsp?rdt=", "");
    return urlWithoutLogin;
}

chrome.browserAction.onClicked.addListener(function(tab) {skipNetSuiteLoginInCurrentTab(tab);});
