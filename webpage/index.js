//data declarations
let leaderboards = data;
let characters = findCharacters(leaderboards);
let ranks = findRanks(leaderboards);
let characterRanks = getCharacterData(leaderboards, characters, ranks);
let rankCharacters = getRankData(leaderboards, characters, ranks);


//element selections
let leaderboard = document.querySelector("#leaderboard");
let nextButton = document.querySelector(".next");
let previousButton = document.querySelector(".previous");
let searchInput = document.querySelector("#search");
let searchButton = document.querySelector("#searchSubmit");
let tbody = document.querySelector("tbody");

let page = 0;

//functions
const clearBoard = () => {
  document.querySelector("tbody").remove();
  tbody = document.createElement("tbody");
  leaderboard.appendChild(tbody);
}

const renderCurrentPage = () => {
  let i = page * 100;
  let end = i + 100;
  clearBoard();
  for (i; i < end; i++) {
    renderRow(leaderboards[i]);
  }
}

const renderRow = player => {
  let tr = document.createElement("tr");
  tbody.appendChild(tr);

  let rankTd = document.createElement("td");
  rankTd.classList.add("rank");
  rankTd.appendChild(document.createTextNode(player.rank_number));
  tr.appendChild(rankTd);

  let playerTd = document.createElement("td");
  playerTd.classList.add("player");
  playerTd.appendChild(document.createTextNode(player.name));
  tr.appendChild(playerTd);

  let charTd = document.createElement("td");
  let charImg = document.createElement("img");
  charImg.src=`../chars/${player.character}.png`;
  charTd.classList.add("character");
  charTd.appendChild(charImg)
  tr.appendChild(charTd);

  let rankTitleTd = document.createElement("td");
  let rankImg = document.createElement("img");
  rankImg.src=`../ranks/${player.rank}.png`;
  rankTitleTd.classList.add("ranktitle");
  rankTitleTd.appendChild(rankImg);
  tr.appendChild(rankTitleTd);
}

const renderSearch = results => {
  clearBoard();
  for (let i=0; i < 100; i++) {
    renderRow(results[i]);
  }
}

const loading = () => {
  leaderboard.className += " blurry"
  setTimeout(() => leaderboard.classList.remove("blurry"), 2000)
}

const nextPage = () => {
  if ((page + 1) + 100 < leaderboards.length ) {
    // loading()
    page += 1;
    renderCurrentPage();
  }
  else {null}
}

const prevPage = () => {
  if (page > 0) {
    // loading()
    page -= 1;
    renderCurrentPage();
  }
  else {null}
}

const search = term => {
  term = term.toLowerCase();
  results = leaderboards.filter(pl => pl.name.toLowerCase().includes(term) || pl.rank.toLowerCase().includes(term) || pl.character.toLowerCase().includes(term));
  renderSearch(results);
}

nextButton.addEventListener("click", nextPage);
previousButton.addEventListener("click", prevPage);
searchSubmit.addEventListener("click", () => search(searchInput.value));
document.addEventListener("keydown", (e) => {
  if (e.target.id !== "search") {
    if (e.keyCode === 81) {prevPage()}
    if (e.keyCode === 87) {nextPage()}
  }
})

renderCurrentPage();
