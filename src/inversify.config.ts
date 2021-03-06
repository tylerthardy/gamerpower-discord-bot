import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './inversify.types';

import { Client } from 'discord.js';

import { DiscordClient } from './discord-bot/discord-client.model';
import { DiscordBotService } from './discord-bot/discord-bot.service';
import { Environment, EnvironmentHelper } from './environment';
import { GamerPowerService } from './gamerpower/gamerpower.service';
import { HttpClient } from './http-client/http-client';
import { CommandHandler } from './discord-bot/handlers/command.handler';
import { ScheduledTaskHandler } from './discord-bot/handlers/scheduled-task.handler';

const container = new Container();
container.bind<Environment>(TYPES.Environment).toConstantValue(EnvironmentHelper.toEnvironment(process.env));
container.bind<DiscordClient>(TYPES.DiscordClient).toConstantValue(new Client());
container.bind<HttpClient>(TYPES.HttpClient).to(HttpClient).inSingletonScope();
container.bind<GamerPowerService>(TYPES.GamerPowerService).to(GamerPowerService).inSingletonScope();
container.bind<CommandHandler>(TYPES.CommandHandler).to(CommandHandler).inSingletonScope();
container.bind<ScheduledTaskHandler>(TYPES.ScheduledTaskHandler).to(ScheduledTaskHandler).inSingletonScope();
container.bind<DiscordBotService>(TYPES.DiscordBotService).to(DiscordBotService).inSingletonScope();

export default container;