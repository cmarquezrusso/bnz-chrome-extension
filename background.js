name='JSESSIONID';

function alert_cookie()
{
    chrome.cookies.getAll({}, function (cookies) {
        cookies.forEach(function(cookie) {
            if(cookie.name == name)
            {
                console.log(JSON.stringify(cookie.value));
                notification();
            };
    });
    }
    );
 }

function notification()
{
    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'New AUTH Token Detected',
        message: 'BNZ Extractor will be notified'
     });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    //alert('Background page here. Token received');
    alert_cookie();
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({'url': chrome.extension.getURL('options.html'), 'selected': true});
});