import 'use-strict';
import dotenv from 'dotenv';
import { REST, Routes, Client, Events, GatewayIntentBits } from 'discord.js';
import path, { dirname } from 'path';
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envFile = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envFile });

export interface ProcessEnv {
  NODE_ENV: 'development' | 'production';
  TOKEN: string;
  CLIENT_ID: string;
}

export const ENV: ProcessEnv = <any> process.env;

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(ENV.TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(ENV.CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}



const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(ENV.TOKEN);
