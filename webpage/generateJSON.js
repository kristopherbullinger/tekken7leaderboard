const fs = require('fs');

let p = './webpage/tekken_rank_data_csv_160120190051.txt'

const csvToJSON = data => {
  let players = [];
  data.split("\n").forEach(player => {
      if (player) {
        let playerinfo = player.split(", ");
        let rank_number = playerinfo.shift();
        let rank = playerinfo.pop().trim();
        let character = playerinfo.pop();
        let name = playerinfo.join(", ");
        players.push({rank_number, rank, character, name});
      }
  });
  return players;
};

let data = fs.readFileSync(p).toString();

data = csvToJSON(data);

fs.writeFileSync('./data.json', "data = " + JSON.stringify(data));
