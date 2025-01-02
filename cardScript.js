let APIURL = 'https://pokeapi.co/api/v2/pokemon';
let poke_container = document.getElementById('poke-container');
let pokemon_count = 1010;
let colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#eed535',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fdb9e9',
    poison: '#b97fc9',
    bug: '#ccfc95',
    dragon: '#97b3e6',
    psychic: '#f366b9',
    flying: '#9de5fa',
    fighting: '#d56723',
    normal: '#F5F5F5',
    ghost: '#7b62a3',
    steel: '#9eb7b8',
    ice: '#51c4e7',
    dark: '#707070',
};

let clearContainer = () => {
    poke_container.innerHTML = '';
};

let renderPokemonList = (pokemons) => {
    clearContainer();
    pokemons.forEach(pokemon => createPokemonCard(pokemon));
};

let fetchPokemons = async () => {
    let pokemons = await Promise.all(
        Array.from({ length: pokemon_count }, (_, i) => getPokemonData(i + 1))
    );
    renderPokemonList(pokemons);
};
fetchPokemons();

let getPokemonData = async (id) => {
    let url = `${APIURL}/${id}`;
    let res = await fetch(url);
    let data = await res.json();
    return data;
};

let createPokemonCard = (pokemon) => {
    let pokemonItem = document.createElement('div');
    pokemonItem.classList.add('pokemon');

    let poke_types = pokemon.types.map(type => type.type.name);
    let type = poke_types[0]; 
    let color = colors[type]; 
    pokemonItem.style.backgroundColor = color;

    let name = `${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}`;
    let id = pokemon.id.toString().padStart(3, '0'); 
    let typeElements = poke_types.map(type => `<small class="type"><span>${type.toUpperCase()}</span></small>`).join(' ');

    pokemonItem.innerHTML = `
    <div class="pokemon-card-inner">
        <div class="pokemon-card-front" style="background-color: ${color};">
            <div class="img-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${name}">
            </div>
            <div class="info">
                <span class="number">#${id}</span>
                <h3 class="name">${name}</h3>
                ${typeElements}
            </div>
        </div>
        <div class="pokemon-card-back">
            <h3>Stats</h3>
            <ul class="stats"></ul>
        </div>
    </div>
    `;
    
    pokemonItem.addEventListener('click', async () => {
        let detailedPokemon = await getPokemonData(pokemon.id);
        let statsList = pokemonItem.querySelector('.stats');

        if (!statsList.innerHTML) {
            let stats = detailedPokemon.stats.map(stat => `<li><strong>${stat.stat.name.toUpperCase()}:</strong> ${stat.base_stat}</li>`).join('');
            statsList.innerHTML = stats;
        }

        let cardInner = pokemonItem.querySelector('.pokemon-card-inner');
        cardInner.classList.toggle('flipped');
    });

    poke_container.appendChild(pokemonItem);
};

export { colors, fetchPokemons, getPokemonData, createPokemonCard };