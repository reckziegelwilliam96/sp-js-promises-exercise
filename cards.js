const drawButton = document.getElementById('draw-button');
const cardImage = document.getElementById('card-image');

let deckId;
let remainingCards;

// Make initial request to create a new deck
axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
        deckId = res.data.deck_id;
        remainingCards = res.data.remaining;
    })
    .catch(err => console.log(err));

// Add click event listener to the draw button
drawButton.addEventListener('click', () => {
    // If there are no cards remaining, disable the button
    if (remainingCards === 0) {
        drawButton.disabled = true;
        return;
    }

    // Make request to draw a card from the deck
    axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => {
            const card = res.data.cards[0];
            const imageUrl = card.image;
            cardImage.src = imageUrl;
            remainingCards = res.data.remaining;
        })
        .catch(err => console.log(err));
});

////////////////////////////////////////////////
//single card value and suit

axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
    .then(res => {
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
    })
    .then()
    .catch(err => console.log(err))

    ////////////////////////////////////////////////
// two cards value and suit

let dId;

// Make initial request to draw a card from a shuffled deck
axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
        dId = res.data.deck_id;
        return axios.get(`https://deckofcardsapi.com/api/deck/${dId}/draw/?count=1`);
    })
    .then(res => {
        const card1 = res.data.cards[0];
        console.log('First card:', card1.value, card1.suit);
        return axios.get(`https://deckofcardsapi.com/api/deck/${dId}/draw/?count=1`);
    })
    .then(res => {
        const card2 = res.data.cards[0];
        console.log('Second card:', card2.value, card2.suit);
    })
    .catch(err => console.log(err));