// Thanks for Angel for giving me like half the code lmao \\

// Variables \\
const Discord = require('discord.js');
const {
	Client,
	Attachment,
} = require('discord.js');
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES] });
const config = require("./bot-config.json");
const token = config.token;
var channel = null;
var canUse = false;
const channelID = document.querySelector("#channelID")
const message = document.querySelector("#message")
const send = document.querySelector("#send")

// Nav Bar \\

document.querySelector("#navMain").addEventListener("click", () => nav("main"));
document.querySelector("#navSettings").addEventListener("click", () => nav("settings"));

function nav(where) {
	var pages = document.querySelectorAll(".page");

	pages.forEach(page => {
		if (page.id == where) {
			page.style.display = '';
		} else {
			page.style.display = 'none';
		}
	})
}

// Advanced Mode \\

function ToggleAdv() {
	var div = document.querySelector("#advancedMode"); // var moment
	var btn = document.querySelector("#advancedModeButton"); // var moment
	if (div.style.display === "block") {
		div.style.display = "none";
		btn.innerText = "▼";
	} else {
		div.style.display = "block";
		btn.innerText = "▲";
	}
}

// Themes \\

var secret = false;
const dda = document.querySelector("#dda");
const theme = document.querySelector("#theme");
const themeLink = document.querySelector("#theme-link");

const fs = require('fs');
var settings = {};

document.addEventListener("DOMContentLoaded", () => {
	if (fs.existsSync('./settings.json')) {
		settings = JSON.parse(fs.readFileSync('./settings.json'));
		themeLink.href = './Themes/' + settings.theme + '.css';
		secret = settings.secretEnabled;

		const options = Array.from(theme.options);
		options.forEach((option, i) => {
			if (option.value === settings.theme) theme.selectedIndex = i;
		});
		if (settings.secretEnabled) dda.style.display = "block"
	}
})

// Secret Theme Toggle \\

var clickA = -3
function themeTouch() {
	clickA++;
	if (clickA > 5) {
		clickA = 0;
	}
	console.log(clickA);
	switch (clickA) {
		case 0:
			clickA = 1;
			console.log(clickA);
		break;
		case 1:
			clickA = 2;
			console.log(clickA);
		break;
		case 2:
			clickA = 3;
			console.log(clickA);
		break;
		case 3:
			clickA = 4;
			console.log(clickA);
		break;
		case 4:
			clickA = 5;
			console.log(clickA);
			console.log("Knocked 5 times!")
			dda.style.display = "block" // uhhhhh yes?
			secret = true;
		break;
	}
}

function saveChanges() {
	themeLink.href = './Themes/' + theme.options[theme.selectedIndex].value + '.css';

	var themeData = theme.options[theme.selectedIndex].value;
	settings.theme = themeData;
	settings.secretEnabled = secret;

	try {
		fs.writeFileSync('./settings.json', JSON.stringify(settings));
		// file written successfully
	} catch (err) {
		console.error(err);
	}
}

// Embed \\
/*
ectoggle.addEventListener('change', () =>
{
  if (ectoggle.checked)
  {
	ecolor.style.display = '';
	eclabel.style.display = '';
  }
  else
  {
	ecolor.style.display = 'none';
	eclabel.style.display = 'none';
  }
});

// Angel also helped me this code, but I made the like idea and var's \\
sendembed.addEventListener('click', () =>
{
  if (channel != null)
  {
	const cnslembed = new Discord.MessageEmbed()
	.setTitle(input.value);
	if (etst.checked == true)
	  cnslembed.setTimestamp();
	if (ectoggle.checked == true)
		cnslembed.setColor(ecolor.value);
	channel.send(cnslembed);
	input.value = '';
  }
});

// Set Status \\

setstatus.addEventListener('click', () =>
{
	if (playings.checked) {
	  bot.user.setActivity(input.value, {
		  type: 'PLAYING'
	  })
	  playings.checked = false
	  input.value = ''
	} else if (watchings.checked) {
		bot.user.setActivity(input.value, {
			type: 'WATCHING'
		})
		watchings.checked = false
		input.value = ''
	}
    
});
*/
// Send Message \\

send.addEventListener('click', () => {
	if (canUse) {
		bot.channels.fetch(channelID.value).then(ch => channel = ch).catch(e => alert(e));
		if (channel != null) {
			channel.send(message.value);
			message.value = '';
		}
	}
});

// Basic Stuff \\

bot.on('ready', () => {
	canUse = true;
	bot.user.setActivity("Code", {
		type: 'WATCHING'
	})
})


bot.login(token);