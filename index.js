function fetchPokedexEntries() {
    const pokedexUrl = 'https://pokeapi.co/api/v2/pokedex/1/';
    
    fetch(pokedexUrl)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(function(data) {
            const entries = data.pokemon_entries.slice(242, 251); // setting up the specific entries you need 
            // Select the element where you want to append the fetched entries 
            const entryList = document.getElementById('pokemon-entries');

            // Clear existing content in the list if any
            entryList.innerHTML = '';

            // Loop through the fetched entries and create list items
            entries.forEach(function(entry) {
                const listItem = document.createElement('li');
                listItem.textContent = entry.pokemon_species.name; // Assuming the entry structure has a name property
                entryList.appendChild(listItem); 

                listItem.addEventListener('click', ()=>{
                    console.log(listItem)
                })
            });
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
        });
}
        

fetchPokedexEntries();