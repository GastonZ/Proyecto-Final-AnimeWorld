const anime_url = "https://api.jikan.moe/v3"

function searchAnime(event){

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

    fetch(`${anime_url}/search/anime?q=${query}&page=1`)
    .then(res=>res.json())
    .then(updateDom)
    .catch(err=>console.warn(err.message)); 
}

function updateDom(data){

    const searchResults = document.getElementById('search-results')

    const animeByCategories = data.results
        .reduce((acc, anime)=>{

            const {type} = anime;
            if(acc[type] === undefined) acc[type] = [];
            acc[type].push(anime);
            return acc;

        }, {});

        searchResults.innerHTML = Object.keys(animeByCategories).map(key=>{

            const animesHTML = animeByCategories[key]
            .sort((a,b)=>a.episodes-b.episodes)
            .map(anime=>{
                return `
                <div class="card m-3" style="width: 18rem;">
                    <img src="${anime.image_url}" class="card-img-top" alt="...">
                    <div class="card-body test">
                        <h5 class="card-title text-light">${anime.title}</h5>
                        <p class="card-text text-light">${anime.synopsis}</p>
                        <a href="${anime.url}" target="_blank" class="btn btn-dark m-2">Find out more</a>                       
                     </div>
              </div>`
            }).join("");

            return `
                <section>
                    <h3 class="text-center fs-1">${key.toUpperCase()}</h3>
                <div class="drago-row">${animesHTML}</div>
                </section>
            `

        }).join("");
        
}

function pageLoaded(){
   
    const form = document.getElementById('search-form');
    const btn = document.getElementById('search-form')

    form.addEventListener("submit", searchAnime)
    btn.addEventListener("click", searchAnime)
}


window.addEventListener("load", pageLoaded);


/* MY ANIME LIST */

/* let removeAnime = document.getElementsByClassName('remove')
let addToList = document.getElementsByClassName('addToList')


for (let i = 0; i < removeAnime.length; i++) {
    let button = removeAnime[i]
    button.addEventListener('click', function(event) {
        let buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
    })
}

for (let i = 0; i < addToList.length; i++) {
    let button = addToList[i]
    button.addEventListener('click', addToListClicked)
}

function addToListClicked(event) {
    let button = event.target
    let anime = button.parentElement.parentElement
    let title = anime.getElementsByClassName('card-title')[0].innerHTML
    console.log(title)
} */