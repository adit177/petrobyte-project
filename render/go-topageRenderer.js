document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const suggestionsPanel = document.getElementById('suggestions-panel');

    let suggestions = [];

    // Fetch data from the JSON file
    fetch('../data.json')
        .then(response => response.json())
        .then(data => {
            suggestions = data;
        })
        .catch(error => console.error('Error fetching data:', error));

    searchInput.addEventListener('input', () => {
        const input = searchInput.value.toLowerCase();
        suggestionsPanel.innerHTML = '';

        const filteredSuggestions = suggestions.filter(suggestion => {
            // Check against page name
            if (suggestion.name.toLowerCase().includes(input)) {
                return true;
            }

            // Check against keywords
            for (let keyword of suggestion.keywords) {
                if (keyword.toLowerCase().includes(input)) {
                    return true;
                }
            }

            return false;
        });

        filteredSuggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.innerHTML = suggestion.name;
            div.addEventListener('click', () => {
                openPage(suggestion.path);
            });
            suggestionsPanel.appendChild(div);
        });

        if (input === '') {
            suggestionsPanel.innerHTML = '';
        } else {
            suggestionsPanel.style.display = 'block';
        }
    });


    document.addEventListener('click', (e) => {
        if (e.target.id !== 'search-input') {
            suggestionsPanel.style.display = 'none';
        }
    });
});

function openPage(pagePath) {
    // Logic to open the page related to the suggestion clicked.
    window.location.href = pagePath;
}
