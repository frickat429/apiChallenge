function fetchPokedexEntries() {
    const pokedexUrl = 'https://pokeapi.co/api/v2/pokedex/1/'; // This fetch is getting the names of the pokemon onto the page
    let currentPokemon = null;

    fetch(pokedexUrl)
        .then(resp => resp.json())
        .then(data => {
            const entries = data.pokemon_entries.slice(242, 251); // this line only fetches entries 242 to 251 

            const entryList = document.querySelector('#pokemon-entries');

            entryList.innerHTML = '';

            // Loops through the fetched entries and create list items
            entries.forEach(function(entry) {
                const listItem = document.createElement('li');
                listItem.textContent = entry.pokemon_species.name; 
                entryList.appendChild(listItem); 
                
                listItem.addEventListener('click', () => {
                    const pokemonName = entry.pokemon_species.name; 
                    if (currentPokemon) {
                        currentPokemon.remove();
                    }
                    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                        .then(resp => resp.json())
                        .then(pokemonData => { 
                            const img = document.createElement('img');
                            img.src = pokemonData.sprites.front_default;
                            img.alt = pokemonName;
                            entryList.appendChild(img);
                            const numberElement = document.querySelector("#Dex-num");
                            numberElement.textContent = `Dex Number: ${pokemonData.id}`;
                            const weightElement = document.querySelector("#weight");
                            weightElement.textContent = `Weight: ${pokemonData.weight} lbs`; // Display Pokemon's Weight
                            
                            entryList.classList.add('centered-content');
                            currentPokemon = img;
                        });
                });
            });
        });
}

fetchPokedexEntries();
