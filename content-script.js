//alert('BNZ logged in sucessfully. Sending a message to the background page');
chrome.runtime.sendMessage({greeting: "token"}, function(response) {
  console.log(response.farewell);
});