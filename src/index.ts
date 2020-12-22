require('dotenv').config();
import { DiscordBotService } from './discord-bot/discord-bot.service';
import { GamerPowerService } from './gamerpower/gamerpower.service';
import { Giveaway } from './gamerpower/model/giveaway.interface';
import { HttpClient } from './http-client/http-client';
import container from './inversify.config';
import {TYPES} from './inversify.types';

console.log('Application started');
const bot = container.get<DiscordBotService>(TYPES.DiscordBotService);
const giveawayService = container.get<GamerPowerService>(TYPES.GamerPowerService);
const httpClient = container.get<HttpClient>(TYPES.HttpClient);

giveawayService.getAllGiveaways().then(x => console.log(JSON.stringify(x)));
giveawayService.getWorth().then(x => console.log(JSON.stringify(x)));