import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './inversify.types';

import { Client } from 'discord.js';

import { DiscordClient } from './discord-bot/discord-client';
import { DiscordBotService } from './discord-bot/discord-bot.service';
import { Environment, EnvironmentHelper } from './environment';

const container = new Container();
container.bind<Environment>(TYPES.Environment).toConstantValue(EnvironmentHelper.toEnvironment(process.env));
container.bind<DiscordClient>(TYPES.DiscordClient).toConstantValue(new Client());
container.bind<DiscordBotService>(TYPES.DiscordBotService).to(DiscordBotService).inSingletonScope();

export default container;