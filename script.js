const APIURL = 'https://pokeapi.co/api/v2/pokemon';
const poke_container = document.getElementById('poke-container');
const pokemon_count = 150;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        const pokemon = await getPokemonData(i);
        createPokemonCard(pokemon);
    }
};

const getPokemonData = async (id) => {
    const url = `${APIURL}/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
};

const createPokemonCard = (pokemon) => {
    const pokemonItem = document.createElement('div');
    pokemonItem.classList.add('pokemon');

    const poke_types = pokemon.types.map((type) => type.type.name);
    const type = poke_types[0]; 
    const color = colors[type]; 
    pokemonItem.style.backgroundColor = color;

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0'); 

    pokemonItem.innerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

    poke_container.appendChild(pokemonItem);
};

fetchPokemons();