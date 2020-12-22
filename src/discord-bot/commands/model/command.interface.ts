import { Message } from "discord.js";

export interface ICommand {
    name: string;
    callback: (message: Message, args: string[]|null) => void;
    admin?: boolean;
}