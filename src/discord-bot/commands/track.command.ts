import { Channel, Message, TextChannel } from "discord.js";
import { GamerPowerService } from "../../gamerpower/gamerpower.service";
import { Giveaway } from "../../gamerpower/model/giveaway.interface";
import container from "../../inversify.config";
import { TYPES } from "../../inversify.types";
import { ScheduledTaskHandler } from "../handlers/scheduled-task.handler";
import { ICommand } from "./model/command.interface";

export class TrackGamerPowerCommand implements ICommand {
    private scheduledTaskHandler: ScheduledTaskHandler;
    private gamerPowerService: GamerPowerService;

    private giveaways: Giveaway[] = [];
    private maxGiveawayId = 0;

    constructor() {
        this.scheduledTaskHandler = container.get(TYPES.ScheduledTaskHandler)
        this.gamerPowerService = container.get(TYPES.GamerPowerService)
    }
    name = 'track';
    admin = true;
    callback(message: Message, args: string[]|null): void {
        if (message.channel.constructor.name !== TextChannel.name) {
            return;
        }
        const channel = message.channel as TextChannel;
        channel.send('Tracking giveaways on this channel!');
        this.scheduledTaskHandler.registerTask('track', 15*60000, () => this.reportNewGiveaways(channel));
    };

    private async reportNewGiveaways(channel: TextChannel) {
        await this.getNewGiveaways().then((newGiveaways) => {
            channel.send(JSON.stringify(newGiveaways.map(g => g.id)));
        });
    }

    private async getNewGiveaways(): Promise<Giveaway[]> {
        const allGiveaways = await this.gamerPowerService.getAllGiveaways() as Giveaway[];
        const newGiveaways = allGiveaways.filter(g => g.id > this.maxGiveawayId);
        this.maxGiveawayId = Math.max(this.maxGiveawayId, ...newGiveaways.map(g => g.id));
        return newGiveaways;
    }
}