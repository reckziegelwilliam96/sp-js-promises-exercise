axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000')
  .then(res => {
    const pokemonList = res.data.results;
    // Get three random Pokemon
    const randomIndices = [];
    while (randomIndices.length < 3) {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    // Make requests to the URLs of the random Pokemon
    const requests = randomIndices.map(i => axios.get(pokemonList[i].url));
    return Promise.all(requests);
  })
  .then(results => {
    // Get the name of each random Pokemon and make a second request to the species URL
    const speciesRequests = results.map(res => {
      const name = res.data.name;
      const speciesUrl = res.data.species.url;
      return axios.get(speciesUrl)
        .then(res => {
          const flavorTextEntries = res.data.flavor_text_entries;
          const englishEntry = flavorTextEntries.find(entry => entry.language.name === "en");
          const flavorText = englishEntry.flavor_text;
          return {name, flavorText};
        });
    });
    return Promise.all(speciesRequests);
  })
  .then(results => {
    // Display the information on an HTML page
    const pokemonContainer = document.getElementById("pokemon-container");
    results.forEach(result => {
      const pokemonCard = document.createElement("div");
      pokemonCard.classList.add("pokemon-card");
      const pokemonImageContainer = document.createElement("div");
      pokemonImageContainer.classList.add("pokemon-image-container");
      const pokemonImage = document.createElement("img");
      pokemonImage.classList.add("pokemon-image");
      const pokemonInfo = document.createElement("div");
      pokemonInfo.classList.add("pokemon-info");
      const pokemonName = document.createElement("h2");
      pokemonName.classList.add("pokemon-name");
      const pokemonDescription = document.createElement("p");
      pokemonDescription.classList.add("pokemon-description");
      pokemonImage.src = `https://img.pokemondb.net/sprites/home/normal/${result.name}.png`;
      pokemonName.textContent = result.name;
      pokemonDescription.textContent = result.flavorText;
  
      pokemonImageContainer.appendChild(pokemonImage);
      pokemonInfo.appendChild(pokemonName);
      pokemonInfo.appendChild(pokemonDescription);
      pokemonCard.appendChild(pokemonImageContainer);
      pokemonCard.appendChild(pokemonInfo);
      pokemonContainer.appendChild(pokemonCard);
    });
  })
  .catch(err => console.log(err));