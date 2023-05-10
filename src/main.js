const fs = require('node:fs');
const path = require('node:path');
// 檔案的寫入寫出需要以上兩個套件

const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
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
// 儲存指令的實體

const foldersPath = path.join(__dirname, 'commands');
// 讀取commands資料夾變成一個實體
// __dirname: 目前資料夾的根目錄
const commandFolders = fs.readdirSync(foldersPath);
// 將flodersPath裡的資料夾變成一個字典

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder); // 將指令的資料夾變成一個物件
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // 掃描資料夾底下的.js然後放進去物件裡
	for (const file of commandFiles) {
		// 將每個.js在確認有data和execute後 將指令裝進去commands裡面
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

// InteractionCreate: 當discord發現有和使用者的互動產生時會啟動這個事件
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});


client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN);