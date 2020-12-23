import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { Environment } from "../environment";
import container from "../inversify.config";
import { TYPES } from "../inversify.types";
import { DiscordClient } from "./discord-client.model";
import { CommandHandler } from "./handlers/command.handler";

@injectable()
export class DiscordBotService {
    constructor(
        @inject(TYPES.DiscordClient) public client: DiscordClient,
        @inject(TYPES.Environment) private environment: Environment,
        @inject(TYPES.CommandHandler) private commandHandler: CommandHandler
    ) {
        this.client.on('message', (message: Message) => this.commandHandler.on(message));
        this.client.login(environment.TOKEN);
    }
}