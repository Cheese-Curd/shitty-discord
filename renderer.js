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
const channelID = document.querySelector("#channelID");
const message = document.querySelector("#message");
const send = document.querySelector("#send");
const save = document.querySelector("#save");
const status = document.querySelector("#status");
const statusSetting = document.querySelector("#statusSet");
const statusText = document.querySelector("#statusText");
const activitySetting = document.querySelector("#activitySet");
const advToggle = document.querySelector("#advToggle");
const advMode = document.querySelector("#advMode");
const chat = document.querySelector("#chat");
const pfp = document.querySelector("#pfp");
const name = document.querySelector("#name");
var advEnabled = false;

// Bot Shit \\

document.querySelector('#messageError').style.display = 'block';
document.querySelector('#messageError').style.color = '#FF0000'
document.querySelector('#messageError').innerText = 'Bot Not Ready.';

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

// Saving/Settings \\

advMode.addEventListener('toggle', event => advEnabled = event.detail.state);

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
		if (settings.secretEnabled) dda.style.display = "block";
		if (settings.advanced) {
			advToggle.style.display = "block";
			advMode.setAttribute('state', 'on')
		}
	}
	setTimeout(() => {
		if (bot.username == undefined) {
			name.innerText = 'Unknown Bot';
		} else {
			name.innerText = bot.username;
		}
		if (bot.discriminator == undefined) {
			name.innerText += '#0000';
		} else {
			name.innerText += '#' + bot.discriminator;
		}
	}, 5500);
})

function saveChanges() {
	themeLink.href = './Themes/' + theme.options[theme.selectedIndex].value + '.css';

	var themeData = theme.options[theme.selectedIndex].value;
	settings.theme = themeData;
	settings.secretEnabled = secret;
	settings.advanced = advEnabled;

	try {
		fs.writeFileSync('./settings.json', JSON.stringify(settings));
		if (settings.advanced) {
			advToggle.style.display = "block";
		} else {
			advToggle.style.display = "none";
		}
		save.innerText = "Saved!"
		setTimeout(() => {
			save.innerText = "Save Changes"
		}, 500)
		// file written successfully
	} catch (err) {
		console.error(err);
		save.innerText = "Not Saved!"
		setTimeout(() => {
			save.innerText = "Save Changes"
		}, 500)
	}
}

// Chat Box \\

function chatMSG(author, text, edited = false, deleted = false, prevMessage = '') {
	if (edited == false && deleted == false) {
		chat.innerText += author.username + '#' + author.discriminator + ': ' + text.replace(":tm:", "™️") + '\n';
	} else if (edited == true) {
		var msg = prevMessage
		if (text.includes(':tm:')) {
			text = text.replace(":tm:", "™️")
		}
		if (text.includes(':copyright:')) {te
			text = text.replace(":copyright:", "©️")
		}

		chat.innerText += author.username + '#' + author.discriminator + ': ' + text + ' (edited)\n';
	} else {
		chat.innerText += author.username + '#' + author.discriminator + ': ' + text + ' (deleted)\n';
	}	
}

bot.on('messageCreate', msg => {
	// console.log('Channel ID from message: ', msg.channel.id, ' Current Channel: ', channel.id)
	if (msg.channel.id == channel.id) { 
		chatMSG(msg.author, msg.content);
	}
});

bot.on('messageUpdate', (oldMessage, newMessage) => {
	var msg = newMessage
	if (msg.channel.id == channel.id) {
		chatMSG(msg.author, msg.content, true, false, oldMessage);
	}
})

bot.on('messageDelete', (messageDelete) => {
	var msg = messageDelete
	if (msg.channel.id == channel.id) {
		chatMSG(msg.author, msg.content, false, true);
	}
})

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
*/
// Set Status \\

status.addEventListener('click', () =>
{
	console.log(statusSetting.value);
	bot.user.setActivity(statusText.value, {
		type: statusSetting.value
	})

	bot.user.setPresence({
        status: activitySetting.value,  // You can show online, idle... Do not disturb is dnd
        game: {
            name: statusText.value,  // The message shown
            type: statusSetting.value // PLAYING, WATCHING, LISTENING, STREAMING,
        }
    });
});

// Send Message \\

send.addEventListener('click', () => {
	if (canUse) {
		if (message.value == '') {
			document.querySelector('#messageError').innerText = 'RangeError [MESSAGE_CONTENT_TYPE]:\nMessage content must be a non-empty string.';
			document.querySelector('#messageError').style.color = '#FF0000'
			document.querySelector('#messageError').style.display = 'block'
			document.querySelector('#seperate').style.display = 'none';
		} else {
			document.querySelector('#messageError').style.color = ''
			document.querySelector('#messageError').style.display = 'none'
			document.querySelector('#seperate').style.display = 'block';
		}
		bot.channels.fetch(channelID.value).then(ch => channel = ch).catch(e => { document.querySelector('#channelName').innerText = e; document.querySelector('#channelName').style.color = '#FF0000'; channel = null; });
		document.querySelector('#channelName').style.display = 'block';
		if (channel != null) {
			document.querySelector('#channelName').style.color = ''
			document.querySelector('#channelName').innerText = 'Channel Name: #' +channel.name;
			channel.send(message.value);
			message.value = '';
		}
	}
});

// Basic Stuff \\

bot.on('ready', () => {
	canUse = true;
	document.querySelector('#messageError').style.display = 'none';
	document.querySelector('#seperate').style.display = 'block';
	bot.user.setActivity("Code", {
		type: 'WATCHING'
	})
	console.log('Bot ID: ' + bot.user);
	name.innerText = 'Loading...';
	setTimeout(() => {
		name.innerText = bot.user.username;
		name.innerText += '#' + bot.user.discriminator;
		pfp.src = bot.user.displayAvatarURL();
	}, 5000);
})

bot.login(token).catch(e => document.querySelector('#messageError').innerText = e)
console.log('bot logged in?');