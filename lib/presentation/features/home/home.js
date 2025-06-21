const mainContainer = document.getElementById('main-container');
const pokedexContainer = document.getElementById('pokedex-container');
const pokedexButton = document.getElementById('pokedex');

const hideMainContainerAndDisplayNewContainer = (nextContainer) => {
    mainContainer.style.display = 'none';
    nextContainer.style.display = 'flex';
};

const backMainContainer = (nextContainer) => {
    mainContainer.style.display = '';
    nextContainer.style.display = 'none';
};

pokedexButton.addEventListener('click', () => {
    hideMainContainerAndDisplayNewContainer(pokedexContainer);
});