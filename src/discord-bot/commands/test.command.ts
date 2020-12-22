import { Message } from "discord.js";
import { ICommand } from "./model/command.interface";

export class TestCommand implements ICommand {
    name = 'ping';

    constructor() {}

    callback(message: Message, args: string[]|null): void {
        console.log('pong');
        message.channel.send(`pong ${JSON.stringify(args)}`);
    }
}