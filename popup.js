document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchButton').addEventListener('click', search);
  });
  
  function search() {
    let searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput === '') {
      document.getElementById('result').innerText = 'Please enter a IP or Hostname.';
      return;
    }
  
    chrome.storage.local.get('hostname', function(data) {
      let hostname = data.hostname;
      if (!hostname) {
        document.getElementById('result').innerText = 'Data not available.';
        return;
      }
  
      let searchTerm = searchInput.toLowerCase();
      let found = false;
      let result = '';
  
      // Check if the input matches any IP or hostname
      for (let host in hostname) {
        if (hostname.hasOwnProperty(host)) {
          if (host.toLowerCase() === searchTerm) {
            found = true;
            result += `${host} > ${hostname[host]} `;
          }
          if (hostname[host].toLowerCase() === searchTerm) {
            found = true;
            result += `${searchInput} > ${host} `;
          }
        }
      }
  
      if (!found) {
        document.getElementById('result').innerText = 'No matching IP or Hostname found.';
      } else {
        document.getElementById('result').innerText = result;
      }
    });
  }
  