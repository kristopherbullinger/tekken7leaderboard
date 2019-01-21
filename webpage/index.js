// import { csvToJSON, findCharacters, findRanks, getCharacterData, getRankData } from './js_tools.js'
// import data from './tekken_rank_data_csv_160120190051.txt'

//data declarations
let leaderboards = csvToJSON(data)
let characters = findCharacters(leaderboards)
let ranks = findRanks(leaderboards)
let characterRanks = getCharacterData(leaderboards, characters, ranks)
let rankCharacters = getRankData(leaderboards, characters, ranks)


//element selections
let leaderboard = document.querySelector("#leaderboard")
let nextButton = document.querySelector(".next")
let previousButton = document.querySelector(".previous")
let searchInput = document.querySelector("#search")
let searchButton = document.querySelector("#searchSubmit")

let page = 0


//functions
const renderCurrentPage = () => {
  leaderboard.innerHTML = `<tr>
            <th class="rank">Rank</th>
            <th class="player">Player</th>
            <th class="character">Character</th>
            <th class="ranktitle">Rank Title</th>
          </tr>`
  leaderboards.slice(page * 200, page * 200 + 200).forEach(pl => {
  leaderboard.innerHTML += `
    <tr>
      <td class="rank">${pl.rank_number}</td>
      <td class="player">${pl.name}</td>
      <td class="character"><img src="../chars/${pl.character}.png"></td>
      <td class="ranktitle"><img src="../ranks/${pl.rank}.png"></td>
    </tr>
    `
  })
}

const renderSearch = results => {
  leaderboard.innerHTML = `<tr>
            <th class="rank">Rank</th>
            <th class="player">Player</th>
            <th class="character">Character</th>
            <th class="ranktitle">Rank Title</th>
          </tr>`
  results.slice(0, 200).forEach(pl => {
  leaderboard.innerHTML += `
    <tr>
      <td class="rank">${pl.rank_number}</td>
      <td class="player">${pl.name}</td>
      <td class="character"><img src="../chars/${pl.character}.png"></td>
      <td class="ranktitle"><img src="../ranks/${pl.rank}.png"></td>
    </tr>
    `
  })
}

const nextPage = () => {
  if ((page + 1) + 200 < leaderboards.length ) {page += 1
  renderCurrentPage()}
  else {null}
}

const prevPage = () => {
  if (page > 0) {page -= 1
    renderCurrentPage()}
  else {null}
}

const search = term => {
  term = term.toLowerCase()
  results = leaderboards.filter(pl => pl.name.toLowerCase().includes(term) || pl.rank.toLowerCase().includes(term) || pl.character.toLowerCase().includes(term))
  renderSearch(results)
}

nextButton.addEventListener("click", nextPage)
previousButton.addEventListener("click", prevPage)
searchSubmit.addEventListener("click", () => search(searchInput.value))
document.addEventListener("keydown", (e) => {
  console.log(e)
  if (e.target.id !== "search") {
    if (e.keyCode === 81) {prevPage()}
    if (e.keyCode === 87) {nextPage()}
  }
})

renderCurrentPage()


//${pl.character.split("_").join(" ")}
//${pl.rank.split("_").join(" ")}
