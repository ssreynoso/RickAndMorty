const createCard = function (personaje) {
    const mainContent = document.getElementById('mainContent');
    const card = document.createElement('article');
    card.classList.add('card');

    card.innerHTML = `
    <img class="card__img" src="${personaje.image}" alt="${personaje.name} de la serie Rick and Morty">
    <div class="description">
        <div class="description__left">
            <h3>${personaje.name}</h3>
            <p>${personaje.species}</p>
            <p>${personaje.gender}</p> 
        </div>
        <div class="description__right">
            <p>${personaje.status}</p>
        </div>
    </div>
    <div class="card__details">
        <p>Origin: ${personaje.origin.name}</p>
        <p>Location: ${personaje.location.name}</p>
    </div>
    `
    mainContent.appendChild(card);
}

export { createCard };