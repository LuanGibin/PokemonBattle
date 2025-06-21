const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonAttack = document.querySelector('.pokemon__attack');
const pokemonDefense = document.querySelector('.pokemon__defense');
const pokemonSpecialAttack = document.querySelector('.pokemon__special_attack');
const pokemonSpecialDefense = document.querySelector('.pokemon__special_defense');
const pokemonTypes = document.querySelector('.pokemon__types');

const pokedexForm = document.querySelector('.pokedex-form');
const input = document.querySelector('.input__search');
const buttonPrev = document.getElementById('button-prev');
const buttonNext = document.getElementById('button-next');

let searchPokemon = 1;

const typeImages = {
    grass: "assets/types/grass.png",
    poison: "assets/types/poison.png",
    fire: "assets/types/fire.png",
    water: "assets/types/water.png",
    bug: "assets/types/bug.png",
    normal: "assets/types/normal.png",
    electric: "assets/types/electric.png",
    ground: "assets/types/ground.png",
    fairy: "assets/types/fairy.png",
    fighting: "assets/types/fighting.png",
    flying: "assets/types/flying.png",
    psychic: "assets/types/psychic.png",
    fairy: "assets/types/fairy.png",
    rock: "assets/types/rock.png",
    ice: "assets/types/ice.png",
    ghost: "assets/types/ghost.png",
    dragon: "assets/types/dragon.png",
    steel: "assets/types/steel.png",
    dark: "assets/types/dark.png",
};

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['front_default'];
        pokemonAttack.innerHTML = data['stats'][1]['base_stat'];
        pokemonDefense.innerHTML = data['stats'][2]['base_stat'];
        pokemonSpecialAttack.innerHTML = data['stats'][3]['base_stat'];
        pokemonSpecialDefense.innerHTML = data['stats'][4]['base_stat'];
        input.value = '';
        searchPokemon = data.id;

        // Clear previous types
        pokemonTypes.innerHTML = '';

        // Create a span "pokemon__type" for each type for each pokemon
        data.types.forEach((typeInfo) => {
            const typeSpan = document.createElement('span');
            typeSpan.className = 'pokemon__type';
            const img = document.createElement('img');
            img.src = typeImages[typeInfo.type.name]
            img.alt = typeInfo.type.name;
            img.style.width = "24px";
            img.style.height = "24px";
            typeSpan.appendChild(img);
            pokemonTypes.appendChild(typeSpan);
        });

    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
        pokemonTypes.innerHTML = '';
        pokemonAttack.innerHTML = '';
        pokemonDefense.innerHTML = '';
        pokemonSpecialAttack.innerHTML = '';
        pokemonSpecialDefense.innerHTML = '';
    }
}

pokedexForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);