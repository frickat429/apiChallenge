function fetchPokedexEntries() {
    const pokedexUrl = 'https://pokeapi.co/api/v2/pokedex/1/';
    let currentPokemon = null ;
    fetch(pokedexUrl)
        .then(function(response) {
            if (!response.ok) {
                // throw new Error('Failed to fetch data'); 
            }
            return response.json();
        })
        .then(function(data) {
            const entries = data.pokemon_entries.slice(242, 251); // setting up the specific entries you need 

            const entryList = document.querySelector('#pokemon-entries');

            console.log(entries)
            entryList.innerHTML = '';

            // Loops through the fetched entries and create list items
            entries.forEach(function(entry) {
                const listItem = document.createElement('li');
                listItem.textContent = entry.pokemon_species.name; 
                entryList.appendChild(listItem); 
                
                listItem.addEventListener('click', ()=>{
                    const pokemonName = entry.pokemon_species.name; 
                    if (currentPokemon) {
                        currentPokemon.remove ();
                    }
                    let img = document.createElement('img');
                    img.src = `assets/${pokemonName}.jpg`;
                    img.alt = pokemonName; 
                    entryList.appendChild(img); 
                    currentPokemon = img
                });
            });
        })
        .catch(function(error) {
            console.error('Error fetching data:', error);
        });
}
        

fetchPokedexEntries();