function displayTabText() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const activeTab = tabs[0];
      chrome.tabs.executeScript(activeTab.id, {file: 'src/content-script.js'}, function() {
        chrome.tabs.sendMessage(activeTab.id, {action: 'getTabInfo'}, function(response) {
          const tabTextContainer = document.getElementById('tab-text');
          tabTextContainer.innerText = response.text;
        });
      });
    });
  }
  
  // Fetch and display the tab text when the popup is opened
  displayTabText();
  