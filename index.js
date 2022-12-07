const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
} = require(`discord.js`);
// const { EmbedBuilder } = require("discord.js");
const fs = require("fs"); //npm i fs
let storage = require("./storage.json"); //Make sure to initialize this file first! JSON format - `{}`
function save() {
  fs.writeFileSync("./storage.json", JSON.stringify(storage));
}

const prefix = "*";

let choice = 0;
let playerScore = 0;
let cpuScore = 0;

let coin;

/* This will be for the stats of the characters */
const characters = [
  // Gumball
  {
    name: "Gumball",
    type: "Common",
    points: 2,
  },

  // Darwin
  {
    name: "Darwin",
    type: "Common",
    points: 2,
  },

  // Anais
  {
    name: "Anais",
    type: "uncommon",
    points: 5,
  },

  // Nichole
  {
    name: "Nichole",
    type: "uncommon",
    points: 5,
  },

  // Richard
  {
    name: "Richard",
    type: "uncommon",
    points: 5,
  },

  // Larry
  {
    name: "Larry",
    type: "rare",
    points: 10,
  },

  // Carrie
  {
    name: "Carrie",
    type: "rare",
    points: 10,
  },

  // Penny
  {
    name: "Penny",
    type: "rare",
    points: 10,
  },

  // Tobias
  {
    name: "Tobias",
    type: "rare",
    points: 10,
  },

  // Banana Joe
  {
    name: "Banana Joe",
    type: "rare",
    points: 10,
  },

  // Sarah
  {
    name: "Sarah",
    type: "ultra rare",
    points: 25,
  },

  // Clayton
  {
    name: "Clayton",
    type: "ultra rare",
    points: 25,
  },

  // Ocho
  {
    name: "Ocho",
    type: "ultra rare",
    points: 25,
  },

  // Kenneth
  {
    name: "Kenneth",
    type: "Legendary",
    points: 50,
  },

  // Tina
  {
    name: "Tina",
    type: "Legendary",
    points: 50,
  },
];

let points = 0;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("The bot is online!");

  const activities = [
    "with your emotions...",
    "Minecraft",
    "Bobert rules!!",
    "Use *help to see my commands!",
  ];

  save();

  setInterval(() => {
    const status = activities[Math.floor(Math.random() * activities.length)];
    client.user.setPresence({ activities: [{ name: `${status}` }] });
  }, 5000);
});

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  const messageArray = message.content.split(" ");
  const argument = messageArray.slice(1);
  const cmd = messageArray[0];

  if (!storage[message.author.id]) {
    storage[message.author.id] = {
      joined: false,
    };
  }

  // COMMANDDS

  // test command

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.channel.send(
      `Pong! This message took ${timeTaken} milliseconds to respond.`
    );
  }

  // pong command

  if (command === "pong") {
    message.channel.send("Wait a second... that's what I'm supposed to say...");
  }

  // if (command === "say") {
  //   message.delete();
  //   message.channel.send(message.content.slice(5, message.content.length));
  // }

  // try {
  //   if (message.mentions.has(client.id)) {
  //     message.channel.send("Has someone pinged me?");
  //   }
  // } catch (e) {
  //   //No mentions
  //   // console.log(e);
  // }

  // Rock Paper Scissors

  /*
    These are the choices that the bot
    will make.

    Choice #0: Rock
    Choice #1: Paper
    Choice #2: Scissors
  */

  // if someone chooses rock
  if (command === "rock") {
    choice = Math.floor(Math.random() * 3) + 1;
    if (choice === 1) {
      message.channel.send("It's a tie. I chose rock as well");
      message.channel.send(
        "You have a score of " +
          playerScore +
          " and I have a score of " +
          cpuScore +
          "."
      );
    } else if (choice === 2) {
      cpuScore += 1;
      message.channel.send(
        "Ha! I chose paper! Paper beats rock! I win! You lose!!!!!!!"
      );
      message.channel.send(
        "You have a score of " +
          playerScore +
          " and I have a score of " +
          cpuScore +
          "."
      );
    } else if (choice === 3) {
      playerScore += 1;
      message.channel.send("Ugh, I chose scissors... you win this time...");
      message.channel.send(
        "You have a score of " +
          playerScore +
          " and I have a score of " +
          cpuScore +
          "."
      );
    }
  } else if (command === "paper") {
    choice = Math.floor(Math.random() * 3) + 1;
    if (choice === 1) {
      playerScore += 1;
      message.channel.send("Ugh, I chose rock... you win this time...");
      message.channel.send(
        "You have a score of " +
          playerScore +
          " and I have a score of " +
          cpuScore +
          "."
      );
    } else if (choice === 2) {
      message.channel.send("It's a tie. I chose paper as well");
      message.channel.send(
        "You have a score of " +
          playerScore +
          " and I have a score of " +
          cpuScore +
          "."
      );
    } else if (choice === 3) {
      cpuScore += 1;
      message.channel.send(
        "Ha! I chose scissors! Scissors beats paper! I win! You lose!!!!!!!!"
      );
      message.channel.send(
        "You have a score of " +
          playerScore +
          " and I have a score of " +
          cpuScore +
          "."
      );
    }
  } else if (command === "scissors") {
    choice = Math.floor(Math.random() * 3) + 1;
    if (choice === 1) {
      cpuScore += 1;
      message.channel.send(
        "Ha! I chose rock! Rock beats scissors! I win! You lose!!!!!!!!"
      );
      message.channel.send(
        "You have a score of " +
          playerScore +
          " and I have a score of " +
          cpuScore +
          "."
      );
    } else if (choice === 2) {
      playerScore += 1;
      message.channel.send("Ugh, I chose paper... you win this time...");
      message.channel.send(
        "You have a score of " +
          playerScore +
          " and I have a score of " +
          cpuScore +
          "."
      );
    } else if (choice === 3) {
      message.channel.send("It's a tie. I chose scissors as well.");
      message.channel.send(
        "You have a score of " +
          playerScore +
          " and I have a score of " +
          cpuScore +
          "."
      );
    }
  }

  if (command === "restart") {
    cpuScore = 0;
    playerScore = 0;
    message.channel.send("Restarted the game!");
  }

  if (command === "flip") {
    coin = Math.floor(Math.random() * 1.9);
    if (coin === 0) {
      message.channel.send(":coin: | Heads");
    } else if (coin === 1) {
      message.channel.send(":classical_building: | Tails");
    }
  }

  // The help command

  if (command === "help") {
    const embed = new EmbedBuilder()
      .setColor("BLUE")
      .setTitle("Help")
      .setDescription(
        `The current prefix is ` +
          `${prefix}` +
          `\n\nThese are the list of things you can use\n\n**ping**\nPings the bot to see if it's online\n\n**pong**\nGives a funny response\n\n**rock, paper, or scissors**\nPlays a game against the bot\n\n**flip**\nFlips a coin\n\n**testembed**\nGives a test embed\n\n**restart**\nRestarts the game of rock paper scissors\n\n**More coming soon!**`
      )
      .setTimestamp()
      .setFooter({
        text: "Here to help you out.",
      });

    message.channel.send({ embeds: [embed] });
  }

  // test embed

  if (command === "testembed") {
    // inside a command, event listener, etc.
    const exampleEmbed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("Some title")
      .setURL("https://discord.js.org/")
      .setDescription("Some description here")
      .setThumbnail("https://i.imgur.com/AfFp7pu.png")
      .setImage("https://i.imgur.com/AfFp7pu.png")
      .setTimestamp()
      .setFooter({
        text: "Some footer text here",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });

    message.channel.send({ embeds: [exampleEmbed] });
  }

  if (command === "join") {
    storage[message.author.id].joined = true;
    message.channel.send("" + storage[message.author.id].joined);
    if (storage[message.author.id]) {
      message.channel.send("You are registered");
    }
    save();
  } else if (command === "yes" && storage[message.author.id].joined) {
    message.channel.send("Yay! You can send this message!");
    message.channel.send("" + storage[message.author.id].joined);
  } else if (command === "something") {
    if (!storage[message.author.id].joined) {
      message.channel.send("Whoops! You need to join first!");
      message.channel.send("" + storage[message.author.id].joined);
    } else {
      message.channel.send(characters[0].name);
    }
  }
});

client.login(CLIENT_TOKEN);
