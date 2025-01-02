import { colors, createPokemonCard } from './cardScript.js';
import { capitalizeFirstLetter, showError } from './utils.js';

let pokeContainer = document.getElementById('poke-container');
let typeList = document.getElementById('type-list');
let allPokemons = [];
let currentSearchResults = [];
let selectedType = null;

let setAllPokemons = (pokemons) => {
    allPokemons = pokemons;
    currentSearchResults = pokemons;
};

let setCurrentSearchResults = (pokemons) => {
    currentSearchResults = pokemons;
};

let fetchTypes = async () => {
    try {
        let res = await fetch('https://pokeapi.co/api/v2/type');
        let data = await res.json();
        return data.results.map(type => type.name).filter(type => type !== 'unknown' && type !== 'stellar');
    } catch (error) {
        showError('Error fetching types', typeList);
        return [];
    }
};

let renderPokemonList = (pokemonList) => {
    pokeContainer.innerHTML = '';
    pokemonList.forEach(createPokemonCard);
};

let applyFilter = (type) => {
    pokeContainer.innerHTML = '';
    let filteredPokemons = currentSearchResults.filter(pokemon =>
        pokemon.types.some(t => t.type.name === type)
    );

    if (filteredPokemons.length > 0) {
        renderPokemonList(filteredPokemons);
    } else {
        showError('Pokémon not found', pokeContainer);
    }
};

let handleFilterClick = (type, listItem) => {
    if (selectedType === type) {
        listItem.classList.remove('selected');
        localStorage.removeItem('selectedType');
        selectedType = null;
        renderPokemonList(currentSearchResults);
    } else {
        document.querySelector('#type-list li.selected')?.classList.remove('selected');
        listItem.classList.add('selected');
        localStorage.setItem('selectedType', type);
        selectedType = type;
        applyFilter(type);
    }
};

let initTypeList = async () => {
    let types = await fetchTypes();
    let listItems = types.map(type => {
        let listItem = document.createElement('li');
        listItem.textContent = capitalizeFirstLetter(type);
        listItem.style.backgroundColor = colors[type];
        listItem.addEventListener('click', () => handleFilterClick(type, listItem));
        return listItem;
    });
    typeList.innerHTML = '';
    typeList.append(...listItems);

    let savedType = localStorage.getItem('selectedType');
    if (savedType) {
        let savedListItem = Array.from(typeList.children).find(
            item => item.textContent.toLowerCase() === savedType
        );
        if (savedListItem) {
            handleFilterClick(savedType, savedListItem);
        }
    }
};

initTypeList();

export { setAllPokemons, setCurrentSearchResults, renderPokemonList, applyFilter };