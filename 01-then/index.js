const API_URL = "https://starwars.egghead.training/";
const rickNMorty = "https://rickandmortyapi.com/api/"
const output = document.getElementById("output");
const spinner = document.getElementById("spinner");
const output2 = document.getElementById("output2");
const spinner2 = document.getElementById("spinner-for-ricknmorty");


function getFilmTitles(films) {
  return films
    .slice()
    .sort((a, b) => a.episode_id - b.episode_id)
    .map(film => `${film.episode_id}. ${film.title}`)
    .join("\n");
}

function displayCharacters(characters) {
  return characters.map( char => `
    ${char.name} ${char.species}. ${char.type} 
  ` ).join('\n')
}

output2.innerText = "Loading ...";
fetch(API_URL + "films")
  .then(response => {
    if(!response.ok){
      // throw Error("Unsuccessful response")
      return Promise.reject(
        new Error("unsuccessful response")
      )
    }
    return response.json().then( films => {
      output.innerText = getFilmTitles(films)
    })
  })
  .catch(error => {
    console.warn(error)
    output.innerText = ':('
   
  })
  .finally(() => {
    // finally method used to for clean up logic
    spinner.remove()
  })
 

fetch(rickNMorty + "character/" )
    .then(response => {
      if(!response.ok){
        throw Error("Unsuccessful response")
      }
      return response.json().then(data => {
        let chars = data.results
        output2.innerText = displayCharacters(chars)
      })
    })
    .catch(error => {
      console.warn(error)
      output2.innerText = ":("
    })
    .finally(() => {
      spinner2.remove()
    })
  