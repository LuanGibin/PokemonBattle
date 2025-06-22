const mainContainer = document.getElementById('main-container');
const selectPlayersContainer = document.getElementById('select-players-container');
const selectPlayersButton = document.getElementById('select-players');
const captureContainer = document.getElementById('capture-container');
const selectTeamsPlayersButton = document.getElementById('select-teams-players');
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

selectPlayersButton.addEventListener('click', () => {
    hideMainContainerAndDisplayNewContainer(selectPlayersContainer);
});

selectTeamsPlayersButton.addEventListener('click', () => {
    hideMainContainerAndDisplayNewContainer(captureContainer);
});