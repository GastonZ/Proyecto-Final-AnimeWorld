fetch('https://api.jikan.moe/v3')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log('error'))