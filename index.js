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
                    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                    .then(response => response.json())
                    .then(pokemonData => { 
                        console.log(pokemonData)
                        const img = document.createElement('img');
                        img.src = pokemonData.sprites.front_default;
                        img.alt = pokemonName;
                        entryList.appendChild(img);
                        currentPokemon = img; // Update currentPokemon to the newly displayed Pokémon
                    })
                    .catch(error => console.error('Error fetching Pokémon data:', error));
            });
        });
    })
    
    
}
        

fetchPokedexEntries();