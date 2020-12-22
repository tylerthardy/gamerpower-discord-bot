import { injectable } from "inversify";
import { Client } from 'discord.js';

@injectable()
export class DiscordClient extends Client {}