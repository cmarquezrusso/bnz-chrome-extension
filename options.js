// Saves options to chrome.storage.sync.
function save_options() {
  var url = document.getElementById('url').value;
  var notifications = document.getElementById('notifications').checked;

  chrome.storage.sync.set({
    url: url, notifications: notifications,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    url:'https://192.168.99.100/token',
      notifications:true,
  }, function(items) {
    document.getElementById('url').value = items.url;
    document.getElementById('notifications').checked = items.notifications;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);