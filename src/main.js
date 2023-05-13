const fs = require('node:fs');
const path = require('node:path');
// 檔案的寫入寫出需要以上兩個套件

const { Client, Collection, GatewayIntentBits } = require('discord.js');
// 這裡是引入discord.js的套件
// Client: 用來建立機器人的實體
// Collection: 用來儲存指令的實體
// Events: 用來儲存事件的實體
// GatewayIntentBits: 生成機器人時需要

const dotenv = require('dotenv');
// 這裡是引入dotenv的套件
// 用來讀取.env檔案的套件

dotenv.config();
// 讀取.env檔案

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// 生成機器人的實體

client.commands = new Collection();
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder); // 將指令的資料夾變成一個物件
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file === 'index.js'); // 掃描資料夾底下的.js然後放進去物件裡
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


client.login(process.env.TOKEN);