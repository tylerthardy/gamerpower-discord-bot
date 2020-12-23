import { Message } from "discord.js";
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
        message.channel.send('Tracking giveaways on this channel!');
        this.scheduledTaskHandler.registerTask('track', 5000, () => this.reportNewGiveaways());
    };

    private async reportNewGiveaways() {
        console.log('Starting giveaways fetch...');
        await this.getNewGiveaways().then((newGiveaways) => {
            console.log(JSON.stringify(newGiveaways.map(g => g.id)));
        });
        console.log('After giveaways fetch...');
    }

    private async getNewGiveaways(): Promise<Giveaway[]> {
        console.log('Fetching giveaways...');
        const allGiveaways = await this.gamerPowerService.getAllGiveaways() as Giveaway[];
        console.log(`Processing for new giveaways max giveaway: ${this.maxGiveawayId}...`);
        const newGiveaways = allGiveaways.filter(g => g.id > this.maxGiveawayId);
        console.log('Determining most recent new giveaways...');
        this.maxGiveawayId = Math.max(this.maxGiveawayId, ...newGiveaways.map(g => g.id));
        console.log(`New max giveaway set to: ${this.maxGiveawayId}`);
        console.log('Success!');
        return newGiveaways;
    }
}