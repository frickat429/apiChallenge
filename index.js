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
            const entries = data.pokemon_entries.slice(242, 250); // seting up the spesific entires i need 
            
            // Outputting the fetched entries
            console.log(entries);
            
            // You can further process the entries as needed
        })
        
            
        };


fetchPokedexEntries();