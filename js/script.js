let totalCarregar = 12
let totalPokemons = 1000

let numOrganization = 0;

function loadPokemon() {
    if (document.getElementById("load-btn").textContent == "Voltar à Busca") {
        totalCarregar = 12
        deletePokemons()
        document.getElementById("load-btn").innerHTML = "Carregar mais Pokémon"
        ordemCrescente(1, totalCarregar)
        return
    }
    let totalAntes = totalCarregar + 1
    totalCarregar += 12;
    if (numOrganization == 0) {
        ordemCrescente(totalAntes, totalCarregar)
    } else if (numOrganization == 1) {
        ordemDecrescente(totalPokemons - totalAntes + 1, totalCarregar)
    }
}

function openDropDown() {

    const DropDownContainer = document.getElementsByClassName("dropDown-menu")[0]
    const DropDownArrow = document.getElementById("arrow-dropDown")
    if (DropDownArrow.className == "closed") {
        // arrow animation
        DropDownArrow.classList.remove("closed")
        DropDownArrow.classList.add("opened")

        //open DropDown

        DropDownContainer.style.display = "block"

        return
    }
    // arrow animation
    DropDownArrow.classList.remove("opened")
    DropDownArrow.classList.add("closed")

    //open DropDown

    DropDownContainer.style.display = "none"

    return

}

const opOrganization = document.getElementsByClassName("opOrganization")

for (let i = 0; i < opOrganization.length; i++) {
    opOrganization[i].addEventListener('click', changeOrganizationPokemons)
}

function changeOrganizationPokemons(event) {
    // change name
    document.getElementsByClassName("dropDown-text-content")[0].innerHTML = event.target.textContent

    // organization logic
    deletePokemons()
    totalCarregar = 12
    if (event.target == opOrganization[0]) {
        ordemCrescente(1, totalCarregar)
        numOrganization = 0
    } else if (event.target == opOrganization[1]) {
        ordemDecrescente(totalPokemons, totalCarregar)
        numOrganization = 1
    } else if (event.target == opOrganization[2]) {

    } else if (event.target == opOrganization[3]) {

    }
}

const POKEMON_BASE_URL = "https://pokeapi.co/api/v2/pokemon/"

async function ordemCrescente(inicio, fim) {
    for (let i = inicio; i <= fim; i++) {
        const result = await getAPI(i)
    }
}

async function ordemDecrescente(inicio, fim) {
    for (let i = inicio; i > totalPokemons - fim; i--) {
        // deletePokemons(i)
        const result = await getAPI(i)
    }
}

async function getAPI(i) {
    await fetch(POKEMON_BASE_URL + `${i}`).then(async response => {
        return response.json().then(pokemon => {

            const name = pokemon.name
            const id = pokemon.id
            const img = pokemon.sprites.other["official-artwork"].front_default

            let type1 = pokemon.types[0].type.name

            let type2 = undefined

            if (pokemon.types[1] != undefined) {
                type2 = pokemon.types[1].type.name
            }

            showPokemons(name, id, img, type1, type2)
        })
    })

    const cardsPokemon = document.getElementsByClassName("pokemon-card")

    for (let i = 0; i < cardsPokemon.length; i++) {
        cardsPokemon[i].addEventListener('click', openModal)
    }
}

function deletePokemons() {
    let Pai = document.getElementsByClassName("pokemons-results-container")[0]

    while (Pai.firstChild) {
        Pai.removeChild(Pai.firstChild)
    }
}

function showPokemons(name, id, img, type1, type2) {

    let DivContainer = document.createElement("div")
    DivContainer.classList.add("pokemon-card")
    DivContainer.classList.add("col-lg-3")
    DivContainer.classList.add("mb-3")
    DivContainer.classList.add("col-sm-6")
    DivContainer.classList.add("col-md-4")
    DivContainer.id = id
    document.getElementsByClassName("pokemons-results-container")[0].appendChild(DivContainer)

    // 

    let DivImgContainer = document.createElement("div")
    DivImgContainer.classList.add("img-pokemon")
    DivContainer.appendChild(DivImgContainer)

    let ImgPokemon = document.createElement("img")
    ImgPokemon.src = img
    ImgPokemon.classList.add("img-fluid")
    DivImgContainer.appendChild(ImgPokemon)

    // 

    let DivDescContainer = document.createElement("div")
    DivDescContainer.classList.add("desc-pokemon")
    DivContainer.appendChild(DivDescContainer)


    let idPokemon = document.createElement("p")
    idPokemon.classList.add("id-pokemon")
    idPokemon.innerHTML = "Nº " + id
    DivDescContainer.appendChild(idPokemon)

    let namePokemon = document.createElement("p")
    namePokemon.classList.add("name-pokemon")
    namePokemon.innerHTML = name
    DivDescContainer.appendChild(namePokemon)

    let DivTypesContainer = document.createElement("div")
    DivTypesContainer.classList.add("pokemon-type")
    DivTypesContainer.classList.add("mt-2")
    DivTypesContainer.classList.add("row")
    DivTypesContainer.classList.add("d-flex")
    DivTypesContainer.classList.add("container")
    DivDescContainer.appendChild(DivTypesContainer)

    let type1Container = document.createElement("div")
    type1Container.id = `${type1}-type`
    type1Container.classList.add(`col-xl-6`)
    type1Container.classList.add(`col-sm-12`)
    type1Container.classList.add(`col-6`)
    DivTypesContainer.appendChild(type1Container)

    let type1Pokemon = document.createElement("p")
    type1Pokemon.innerHTML = type1
    type1Pokemon.classList.add("type-text")
    type1Pokemon.classList.add("text-center")
    type1Container.appendChild(type1Pokemon)

    if (type2 != undefined) {
        let type2Container = document.createElement("div")
        type2Container.id = `${type2}-type`
        type2Container.classList.add(`col`)
        DivTypesContainer.appendChild(type2Container)

        let type2Pokemon = document.createElement("p")
        type2Pokemon.classList.add("type-text")
        type2Pokemon.classList.add("text-center")
        type2Pokemon.innerHTML = type2
        type2Container.appendChild(type2Pokemon)
    }

}

async function searchPokemon() {
    deletePokemons()
    let input = document.getElementById("search-bar-input")
    if (!isNaN(input.value)) {
        const result = await getAPI(input.value)
        document.getElementById("load-btn").innerHTML = "Voltar à Busca"
        return
    }
}





function closeModal(modal) {
    modal.classList.add("d-none")
    document.querySelector("body").classList.remove("overflow-hidden")
}

let idPokemonAtivado

async function openModal() {
    document.querySelector("body").classList.add("overflow-hidden")
    await fetch(POKEMON_BASE_URL + `${event.currentTarget.id}`).then(async response => {
        return response.json().then(pokemon => {

            document.getElementsByClassName("pokemon-name-modal")[0].innerHTML = pokemon.name
            document.getElementsByClassName("pokemon-id-modal")[0].innerHTML = "#" + pokemon.id
            idPokemonAtivado = pokemon.id
            document.getElementsByClassName("img-modal")[0].src = pokemon.sprites.other["official-artwork"].front_default
            document.getElementsByClassName("ability-response")[0].innerHTML = pokemon.abilities[0].ability.name
            document.getElementsByClassName("weight-response")[0].innerHTML = pokemon.weight + "lb"
            document.getElementsByClassName("height-response")[0].innerHTML = pokemon.height + "m"

            let type1 = pokemon.types[0].type.name

            let type2 = undefined
            document.getElementsByClassName("type2")[0].id = ``
            document.getElementsByClassName("type2")[0].innerHTML = ""
            if (pokemon.types[1] != undefined) {
                type2 = pokemon.types[1].type.name
                document.getElementsByClassName("type2")[0].id = `${type2}-type`
                document.getElementsByClassName("type2")[0].innerHTML = type2
            }

            document.getElementsByClassName("type1")[0].id = `${type1}-type`
            document.getElementsByClassName("type1")[0].innerHTML = type1



        })
    })
    document.getElementsByClassName("aviso-pokemon-adicionado")[0].style.display = 'none'
    document.getElementsByClassName("bkg-modal-pokemon")[0].classList.remove("d-none")
    document.getElementsByClassName("bkg-modal-pokemon")[0].classList.add("d-flex")



}

function verificaPokemonExiste() {

    for (let j = 0; j < 6; j++) {
        if (listaCapturados[j] == idPokemonAtivado) {
            return true
        }
    }
    return false

}

let listaCapturados = []

function addPokemonList() {
    if (!verificaPokemonExiste() && listaCapturados.length < 6) {
        listaCapturados.push(idPokemonAtivado)
        getPokemonLista(idPokemonAtivado)
        document.getElementsByClassName("aviso-pokemon-adicionado")[0].innerHTML = 'Pokémon adicionado! <b onclick="abrirLista()">Clique aqui para ver a lista.</b>'

    } else {
        document.getElementsByClassName("aviso-pokemon-adicionado")[0].innerHTML = 'O Pokémon já foi adicionado ou a lista está cheia!'
    }
    console.log(listaCapturados)

    document.getElementsByClassName("aviso-pokemon-adicionado")[0].style.display = 'block'


}

function criaPokemonLista(imgSRC, name, id) {

    const rowPokemon = document.createElement("div")
    rowPokemon.classList.add("pokemon-row")
    rowPokemon.classList.add("d-flex")
    rowPokemon.classList.add("align-items-center")
    rowPokemon.classList.add("justify-content-sm-between")
    rowPokemon.classList.add("justify-content-center")
    rowPokemon.id = id

    rowPokemon.innerHTML =
        `
    <div class="left-side-pokemon-lista d-flex flex-column flex-sm-row align-items-center">
    <img src="${imgSRC}" alt="" class="pokemon-lista-img img-fluid">
    <div class="desc-pokemon-lista d-flex">
        <p class="pokemon-lista-name mb-sm-0 mb-4">${name}</p>
        <p class="pokemon-lista-id mb-sm-0 mb-4">#${id}</p>
        <img src="https://cdn-icons-png.flaticon.com/512/542/542724.png" alt="" class="pokemon-lista-icon-trash img-fluid d-block d-sm-none mb-4">
    </div>
</div>
<div class="right-side-pokemon-lista">
    <img src="https://cdn-icons-png.flaticon.com/512/542/542724.png" alt="" class="pokemon-lista-icon-trash img-fluid d-sm-block d-none">
</div>
    `

    document.getElementsByClassName("pokemons-lista-container")[0].appendChild(rowPokemon)


}

async function getPokemonLista(i) {

    await fetch(POKEMON_BASE_URL + `${i}`).then(async response => {
        return response.json().then(pokemon => {

            const name = pokemon.name
            const id = pokemon.id
            const imgSRC = pokemon.sprites.other["official-artwork"].front_default

            criaPokemonLista(imgSRC, name, id)

        })
    })

}

function abrirLista() {

    avisoListaVazia()

    document.querySelector("body").classList.add("overflow-hidden")
    closeModal(document.getElementsByClassName('bkg-modal-pokemon')[0])
    document.getElementsByClassName("bkg-modal-lista")[0].classList.remove("d-none")
    document.getElementsByClassName("bkg-modal-lista")[0].classList.add("d-flex")

    const TrashIcon = document.getElementsByClassName("pokemon-lista-icon-trash")

    for (let i = 0; i < TrashIcon.length; i++) {

        TrashIcon[i].addEventListener("click", (event) => {

            let container
            if(i%2 != 0){
                // console.log("pc")
                container = event.currentTarget.parentNode.parentNode

            }else{
                // console.log("mobile")
                container = event.currentTarget.parentNode.parentNode.parentNode

            }

            // console.log(container)

            listaCapturados.splice(listaCapturados.indexOf(container.id), 1)
            container.remove()

            avisoListaVazia()

        })

    }

}

function avisoListaVazia(){

    if(listaCapturados.length == 0){

        document.getElementsByClassName("lista-empty-aviso")[0].style.display = 'block'

    }else{
        document.getElementsByClassName("lista-empty-aviso")[0].style.display = 'none'

    }

}