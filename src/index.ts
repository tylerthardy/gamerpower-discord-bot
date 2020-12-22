require('dotenv').config();
import { DiscordBotService } from './discord-bot/discord-bot.service';
import container from './inversify.config';
import {TYPES} from './inversify.types';

console.log('Application started');
const environment = container.get<any>(TYPES.Environment);
console.log(`Token: ${environment.TOKEN}`);

const bot = container.get<DiscordBotService>(TYPES.DiscordBotService);