fetch(chrome.runtime.getURL('entries.json'))
  .then(response => response.json())
  .then(data => {
    chrome.storage.local.set({ 'hostname': data });
  });
