chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the content script requesting tab information
    chrome.tabs.sendMessage(tab.id, {action: 'getTabInfo'}, function(response) {
      // Process the response from the content script
      console.log(response);
    });
  });
  