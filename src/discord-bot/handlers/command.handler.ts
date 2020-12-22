import { Message } from "discord.js";
import { injectable } from "inversify";
import { ICommand } from "../commands/model/command.interface";
import { TestCommand } from "../commands/test.command";

@injectable()
export class CommandHandler {
    private commands: Record<string, ICommand> = {};

    constructor() {
        this.registerCommand(new TestCommand());
    }

    registerCommand(command: ICommand) {
        if (this.commands[command.name] != null) {
            console.log(`Command NOT registered: ${command.name}`);
            return;
        }
        console.log(`Command registered: ${command.name}`);
        this.commands[command.name] = command;
    }

    on(message: Message) {
        if (!message.content.startsWith('&')) {
            return;
        }

        const tokens = message.content.substring(1).split(' ');
        const commandName = tokens.shift()!;
        const command = this.commands[commandName];

        if (command != null && this.isAdminValid(message, command)) {
            command.callback(message, tokens);
        }
    }

    private isAdminValid(message: Message, command: ICommand) {
        return !command.admin || (command.admin && message.member?.roles.cache.find(r => r.name === 'Mod'));
    }
}