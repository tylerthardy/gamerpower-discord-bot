import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './inversify.types';

import { Client } from 'discord.js';

import { DiscordClient } from './discord-bot/discord-client.model';
import { DiscordBotService } from './discord-bot/discord-bot.service';
import { Environment, EnvironmentHelper } from './environment';
import { GamerPowerService } from './gamerpower/gamerpower.service';
import { HttpClient } from './http-client/http-client';

const container = new Container();
container.bind<Environment>(TYPES.Environment).toConstantValue(EnvironmentHelper.toEnvironment(process.env));
container.bind<DiscordClient>(TYPES.DiscordClient).toConstantValue(new Client());
container.bind<HttpClient>(TYPES.HttpClient).to(HttpClient).inSingletonScope();
container.bind<DiscordBotService>(TYPES.DiscordBotService).to(DiscordBotService).inSingletonScope();
container.bind<GamerPowerService>(TYPES.GamerPowerService).to(GamerPowerService).inSingletonScope();

export default container;