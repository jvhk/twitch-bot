require('dotenv').config();
const commands = require('./commands_hk.json');
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

  if(message.toLowerCase() === '!pesca') {
    client.say(channel,`/me @${tags.username}, você pescou um(a) ${sortFish()}`);
  }

  if(message.toLowerCase() === '!github') {
    client.say(channel,`/me @${tags.username}, segue lá pra ver mais coisas feias https://github.com/jvhk`);
  }

  if(message.toLowerCase() === '!twitter') {
    client.say(channel,`/me @${tags.username}, impressionante a quantidade de besteira que consigo falar aqui https://twitter.com/joaovdoc `);
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
