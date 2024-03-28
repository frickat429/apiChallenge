function fetchPokedexEntries() {
    const pokedexUrl = 'https://pokeapi.co/api/v2/pokedex/1/'; // This fetch is getting the names of the pokemon onto the page
    let currentPokemon = null;

    fetch(pokedexUrl)
        .then(resp => resp.json())
        .then(data => {
            const entries = data.pokemon_entries.slice(242, 251); // the first pokemon listed is the number after the first number here. If the number changes all poekmon before will apperar. The data is fetching all gen two pokemon

            const entryList = document.querySelector('#pokemon-entries');

            entryList.innerHTML = ''; 

           

            // Loops through the fetched entries and create list items
            entries.forEach(function(entry) {
                const listItem = document.createElement('li');
                listItem.textContent = entry.pokemon_species.name; 
                entryList.appendChild(listItem); 
                const likeButton = document.createElement(`button`) 
                // console.log(likeButton) 
                likeButton.textContent = `Like`
                listItem.appendChild(likeButton) 
                let likeCount = 0 
                likeButton.addEventListener(`click`, ()=>{
                    // console.log(likeButton) 
                    likeCount++
                    likeButton.textContent = `Like(${likeCount})`
                })
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
