const {ipcRenderer} = require('electron');
const { BrowserWindow } = require('@electron/remote');

const win = BrowserWindow.getFocusedWindow();

ipcRenderer.on('change-theme', (event, theme) => {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
  }
  else if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  }
});

//find renderer(text)
// searchBox.js



// Toggle the search box
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'f') {
    const searchBox = document.getElementById('searchBox');
    searchBox.style.display = searchBox.style.display === 'none' ? 'block' : 'none';
    if (searchBox.style.display === 'block') {
      document.getElementById('find-input').focus();
    }
  }
});

// Use "Find in Page" when typing
document.getElementById('find-input').addEventListener('input', (e) => {
  const searchText = e.target.value;
  if (searchText) {
    win.webContents.findInPage(searchText);
  } else {
    win.webContents.stopFindInPage('clearSelection');
  }
});

// Close the search box
document.getElementById('close-search').addEventListener('click', () => {
  document.getElementById('searchBox').style.display = 'none';
  win.webContents.stopFindInPage('clearSelection');
});


function findText() {
  let searchText = document.getElementById("findInput").value;
  if (searchText) {
    let contentDiv = document.getElementById("content2");
    let content = contentDiv.innerHTML;

    // Use regular expressions to highlight all found texts
    let highlightedContent = content.replace(new RegExp(searchText, 'gi'), match => `<span style="background-color: yellow">${match}</span>`);
    contentDiv.innerHTML = highlightedContent;
  }
}

ipcRenderer.on('show-find-box', () => {
  document.getElementById("findBox").style.display = "block";
});

