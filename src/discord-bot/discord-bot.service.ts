import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { Environment } from "../environment";
import { TYPES } from "../inversify.types";
import { DiscordClient } from "./discord-client.model";
import { CommandHandler } from "./handlers/command.handler";
import { ScheduledTaskHandler } from "./handlers/scheduled-task.handler";

@injectable()
export class DiscordBotService {
    constructor(
        @inject(TYPES.DiscordClient) public client: DiscordClient,
        @inject(TYPES.Environment) private environment: Environment,
        @inject(TYPES.ScheduledTaskHandler) private scheduledTaskHandler: ScheduledTaskHandler,
        @inject(TYPES.CommandHandler) private commandHandler: CommandHandler
    ) {
        this.client.on('message', (message: Message) => this.commandHandler.on(message));
        this.client.login(environment.TOKEN);
    }
}