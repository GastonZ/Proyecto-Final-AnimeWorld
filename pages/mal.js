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