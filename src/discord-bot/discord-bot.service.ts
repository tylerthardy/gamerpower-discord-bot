import { inject, injectable } from "inversify";
import { Environment } from "../environment";
import { TYPES } from "../inversify.types";
import { DiscordClient } from "./discord-client.model";

@injectable()
export class DiscordBotService {
    constructor(
        @inject(TYPES.DiscordClient) client: DiscordClient,
        @inject(TYPES.Environment) environment: Environment
    ) {
        client.login(environment.TOKEN);
    }
}