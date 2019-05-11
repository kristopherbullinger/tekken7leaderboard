// let leaderboards = csvToJSON(data)
// let characters = findCharacters(leaderboards)
// let ranks = findRanks(leaderboards)
// let characterRanks = getCharacterData(leaderboards, characters, ranks)
// let rankCharacters = getRankData(leaderboards, characters, ranks)

const csvToJSON = data => {
    return data.split("\n").map(player => {
        let playerinfo = player.split(", ")
        return {rank_number: playerinfo.shift(), rank: playerinfo.pop(), character: playerinfo.pop(), name: playerinfo.join(", ")}
    })
}

const findCharacters = (data, characterList = []) => {
  data.forEach(player => characterList.find(character => character === player.character) ? null : characterList.push(player.character))
  return characterList
}

const findRanks = (data, rankList = []) => {
  data.forEach(player => rankList.find(rank => rank === player.rank) ? null : rankList.push(player.rank))
  return rankList
}

const getCharacterData = (players, characterList, rankList) => {
  characterData = {}
  characterList.forEach(ch => {
    characterData[ch] = {}
    rankList.forEach(rank => {
      characterData[ch][rank] = players.filter(pl => pl.rank === rank && pl.character === ch).length
    })
  })
  return characterData;
}

const getRankData = (players, characterList, rankList) => {
  rankData = {}
  rankList.forEach(rank => {
    rankData[rank] = {}
    characterList.forEach(ch => {
      rankData[rank][ch] = players.filter(pl => pl.rank === rank && pl.character === ch).length
    })
  })
  return rankData
}
