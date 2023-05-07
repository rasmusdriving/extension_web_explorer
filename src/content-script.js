function extractTextFromNode(node) {
    let text = '';
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent.trim() + ' ';
    } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
      for (let child of node.childNodes) {
        text += extractTextFromNode(child);
      }
    }
    return text;
  }
  
  function extractTextFromDocument(doc) {
    return extractTextFromNode(doc.body);
  }
  
  function extractTextFromIframes(iframes) {
    let text = '';
    for (let i = 0; i < iframes.length; i++) {
      try {
        text += extractTextFromDocument(iframes[i].contentDocument) + ' ';
      } catch (err) {
        // Accessing contentDocument might fail in rare cases
      }
    }
    return text;
  }
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'getTabInfo') {
      sendResponse({
        title: document.title,
        url: window.location.href,
        text: extractTextFromDocument(document) + extractTextFromIframes(document.getElementsByTagName('iframe'))
      });
    }
  });
  
  // Make sure the content script runs after the page has fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      chrome.runtime.sendMessage({action: 'pageLoaded'});
    });
  } else {
    chrome.runtime.sendMessage({action: 'pageLoaded'});
  }
  