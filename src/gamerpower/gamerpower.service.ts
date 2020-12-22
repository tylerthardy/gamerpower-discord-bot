import { inject, injectable } from 'inversify';
import { HttpClient } from '../http-client/http-client';
import { ErrorResponse } from '../http-client/model/error-response.interface';
import { TYPES } from '../inversify.types';
import { Giveaway } from './model/giveaway.interface';
import { Worth } from './model/worth.interface';

@injectable()
export class GamerPowerService {
    constructor(
        @inject(TYPES.HttpClient) private httpClient: HttpClient
    ) {}

    async getAllGiveaways(): Promise<Giveaway[] | ErrorResponse> {
        const giveaways = await this.httpClient.get<Giveaway[]>('https://www.gamerpower.com/api/giveaways');
        return giveaways;
    }

    async getWorth(): Promise<Worth | ErrorResponse> {
        const worth = await this.httpClient.get<Worth>('https://www.gamerpower.com/api/worth');
        return worth;
    }
}