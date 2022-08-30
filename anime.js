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
                <div class="card" style="width: 18rem;">
                    <img src="${anime.image_url}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${anime.title}</h5>
                        <p class="card-text">${anime.synopsis}</p>
                        <a href="${anime.url}" class="btn btn-primary">Find out more</a>
                    </div>
              </div>`
            }).join("");

            return `
                <section>
                    <h3>${key.toUpperCase()}</h3>
                <div class="row">${animesHTML}</div>
                </section>
            `

        }).join("");
        
}

function pageLoaded(){
    const form = document.getElementById('search-form');
    form.addEventListener("submit", searchAnime)
}


window.addEventListener("load", pageLoaded);