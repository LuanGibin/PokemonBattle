const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonAttack = document.querySelector('.pokemon__attack');
const pokemonDefense = document.querySelector('.pokemon__defense');
const pokemonSpecialAttack = document.querySelector('.pokemon__special_attack');
const pokemonSpecialDefense = document.querySelector('.pokemon__special_defense');
const pokemonTypes = document.querySelector('.pokemon__types');

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

    /*The list of pokémons goes to 0 - 1025 ou 10001 - 10277*/

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

function isValidPokemonId(id) {
    return (id >= 1 && id <= 1025) || (id >= 10001 && id <= 10263) && (id != 10027 && id != 10028 && id != 10029 && id != 10030 && id != 10031 && id != 10032) && (id != 10080 && id != 10081 && id != 10082 && id != 10083 && id != 10084 && id != 10085) && (id != 10093) && (id != 10094 && id != 10095 && id != 10096 && id != 10097 && id != 10098 && id != 10099) && (id != 10117) && (id != 10121 && id != 10122) && (id != 10128 && id != 10129 && id != 10130 && id != 10131 && id != 10132 && id != 10133 && id != 10134 && id != 10135 && id != 10136 && id != 10137 && id != 10138 && id != 10139 && id != 10140 && id != 10141 && id != 10142 && id != 10143 && id != 10144 && id != 10145 && id != 10146 && id != 10147 && id != 10148 && id != 10149 && id != 10150 && id != 10151) && (id != 10153 && id != 10154) && (id != 10158 && id != 10159 && id != 10160) && (id != 10181 && id != 10182 && id != 10183) && (id != 10185 && id != 10186 && id != 10187);
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
        pokedexInput.value = '';
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
            typeSpan.appendChild(img);
            pokemonTypes.appendChild(typeSpan);
        });

    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
        pokemonTypes.innerHTML = '';
        pokemonAttack.innerHTML = 'X';
        pokemonDefense.innerHTML = 'X';
        pokemonSpecialAttack.innerHTML = 'X';
        pokemonSpecialDefense.innerHTML = 'X';
    }
}