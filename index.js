require('dotenv').config();
const commands = require('./commands.json');
const tmi = require('tmi.js');

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    reconnect: true
  },
  identity: {
    username: process.env.USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: [process.env.USERNAME2]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  // Ignore echoed msg.
  if(!message.startsWith('!')) {
    return; 
  }

  /* debug log
  console.log(`PASSEI DO PRIMEIRO IF`);
  */

  if(message.toLowerCase() === '!go') {
    client.say(channel,`/me @${tags.username}, não recomendamos que você mexa com go`);
  }

  if(message.toLowerCase() === '!culasso') {
    client.say(channel,`/me @${tags.username}, que culasso!`);
  }

  if(message.toLowerCase() === '!pesca') {
    client.say(channel,`/me @${tags.username}, você pescou um(a) ${sortFish()}`);
  }

  if(message.toLowerCase() === '!commands') {
    client.say(channel,`/me ${list_commands_function()}`);
  }
});

client.on('subscription', (channel, username, message, userstate) => {
  console.log("subscription",(channel, username, message, userstate));
  client.say(channel,`@${username} thanks for subscribing GlitchCat`);
});

//get a random fish from an array of fishes
function sortFish(){
  let fishes = ["Tilápia", "Tambaqui", "Traíra", "Piau", 
    "Mandi", "Bagre", "Bonito","Cachara","Piapara", "Piaba", "Pirarucu",
    "Cachorra", "Piranha", "Carpa", "Corvina", "Dourado", "Robalo", "Curimatã",
    "Surubim", "Raia", "Sardinha","Salmão", "Tambacu", "Tucunaré"];

  min = Math.ceil(1);
  max = Math.floor(fishes.length);
  let sorted = Math.floor(Math.random() * (max-min)) + min;
  return fishes[sorted];
}

function list_commands_function(){
  //get an array from "command_list" json key
  list_commands = commands['command_list'].sort();
  return list_commands.join(); //  '!x', '!y', '!z'
}
