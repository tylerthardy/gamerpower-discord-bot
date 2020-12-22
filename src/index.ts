require('dotenv').config();
import { DiscordBotService } from './discord-bot/discord-bot.service';
import container from './inversify.config';
import {TYPES} from './inversify.types';

console.log('Application started');
const bot = container.get<DiscordBotService>(TYPES.DiscordBotService);