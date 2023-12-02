let totalCarregar = 12
let totalPokemons = 1000

let numOrganization = 0;

function loadPokemon(){
    if(document.getElementById("load-btn").textContent == "Voltar à Busca"){
        totalCarregar = 12
        deletePokemons()
        document.getElementById("load-btn").innerHTML = "Carregar mais Pokémon"
        ordemCrescente(1, totalCarregar)
        return
    }
    let totalAntes = totalCarregar+1
    totalCarregar+=12;
    if(numOrganization == 0){
        ordemCrescente(totalAntes, totalCarregar)
    }else if(numOrganization == 1){
        ordemDecrescente(totalPokemons-totalAntes+1, totalCarregar)
    }
}

function openDropDown(){

    const DropDownContainer = document.getElementsByClassName("dropDown-menu")[0]
    const DropDownArrow = document.getElementById("arrow-dropDown")
    if(DropDownArrow.className == "closed"){
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

for(let i = 0; i < opOrganization.length; i++){
    opOrganization[i].addEventListener('click', changeOrganizationPokemons)
}

function changeOrganizationPokemons(event){
    // change name
    document.getElementsByClassName("dropDown-text-content")[0].innerHTML = event.target.textContent

    // organization logic
    deletePokemons()
    totalCarregar = 12
    if(event.target == opOrganization[0]){
        ordemCrescente(1, totalCarregar)
        numOrganization = 0
    }else if(event.target == opOrganization[1]){
        ordemDecrescente(totalPokemons, totalCarregar)
        numOrganization = 1
    }else if(event.target == opOrganization[2]){

    }else if(event.target == opOrganization[3]){

    }
}

const POKEMON_BASE_URL = "https://pokeapi.co/api/v2/pokemon/"

async function ordemCrescente(inicio, fim){
    for(let i = inicio; i <= fim; i++){
        const result = await getAPI(i)
    }
}

async function ordemDecrescente(inicio, fim){
    for(let i = inicio; i > totalPokemons-fim; i--){
        // deletePokemons(i)
        const result = await getAPI(i)
    }
}

async function getAPI(i){
    await fetch(POKEMON_BASE_URL + `${i}`).then(async response =>{
        return response.json().then(pokemon =>{

            const name = pokemon.name
            const id = pokemon.id
            const img = pokemon.sprites.other["official-artwork"].front_default
            
            let type1 = pokemon.types[0].type.name
            
            let type2 = undefined
            
            if(pokemon.types[1] != undefined){
                type2 = pokemon.types[1].type.name
            }

            showPokemons(name, id, img, type1, type2)
        })
    })
}

function deletePokemons(){
    let Pai = document.getElementsByClassName("pokemons-results-container")[0]

    while(Pai.firstChild){
        Pai.removeChild(Pai.firstChild)
    }
}

function showPokemons(name, id, img, type1, type2){

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
    type1Container.classList.add(`${type1}-type`)
    type1Container.classList.add(`col-xl-6`)
    type1Container.classList.add(`col-sm-12`)
    type1Container.classList.add(`col-6`)
    DivTypesContainer.appendChild(type1Container)

    let type1Pokemon = document.createElement("p")
    type1Pokemon.innerHTML = type1
    type1Pokemon.classList.add("type-text")
    type1Pokemon.classList.add("text-center")
    type1Container.appendChild(type1Pokemon)

    if(type2 != undefined){
        let type2Container = document.createElement("div")
        type2Container.classList.add(`${type2}-type`)
        type2Container.classList.add(`col`)
        DivTypesContainer.appendChild(type2Container)

        let type2Pokemon = document.createElement("p")
        type2Pokemon.classList.add("type-text")
        type2Pokemon.classList.add("text-center")
        type2Pokemon.innerHTML = type2
        type2Container.appendChild(type2Pokemon)
    }

}

async function searchPokemon(){
    deletePokemons()
    let input = document.getElementById("search-bar-input")
    if(!isNaN(input.value)){
        const result = await getAPI(input.value) 
        document.getElementById("load-btn").innerHTML = "Voltar à Busca"
        return
    }   
}

ordemCrescente(1, totalCarregar)