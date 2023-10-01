const {ipcRenderer} = require('electron');

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

