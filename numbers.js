
//favorite number
axios.get('http://numbersapi.com/13?json')
    .then(res => {
        const favoriteNumber = res.data.text;
        document.getElementById('results').innerHTML += `<p><b>Favorite Number:</b>${favoriteNumber}</p>`
    })
    .catch(err => console.log(err))
    
////////////////////////////////////////////////
//4 random numbers
let numbers = [];

for (let i = 1; i < 5; i++){
    const n = Math.floor(Math.random() * 1000);
    numbers.push(
        axios.get(`http://numbersapi.com/${n}?json`)
    )
}
Promise.all(numbers)
    .then(arr => {
        for(res of arr){
            const randomNumber = res.data.text;
            document.getElementById('results').innerHTML += `<p><b>Random Number:</b>${randomNumber}</p>`
        }
    })
    .catch(err => console.log(err))


//4 random facts on favorite number
const favoriteNumber = 13;
let requests = [];

for (let i = 0; i < 4; i++) {
    requests.push(axios.get(`http://numbersapi.com/${favoriteNumber}?json`));
}

Promise.all(requests)
    .then(results => {
        const html = results.map(res => `<p>${res.data.text}</p>`).join('');
        document.getElementById('results').innerHTML += `<p><b>Favorite Number:</b> ${favoriteNumber}</p>${html}`;
    })
    .catch(err => console.log(err));

