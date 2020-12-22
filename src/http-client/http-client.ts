import { injectable } from "inversify";
import { ErrorResponse } from "./model/error-response.interface";
import fetch from 'node-fetch';

@injectable()
export class HttpClient {
    constructor() {}

    async get<T>(url: string): Promise<T | ErrorResponse> {
        const response = await fetch(url);
        if (!response.ok || response.body === null) {
            const error: ErrorResponse = {
                error: 'ERROR'
            };
            return error;
        }

        return response.json();
    }

    async post<T>(url: string, body: any): Promise<T | ErrorResponse> {
        const request = {
            method: 'POST',
            body: body
        };
        const response = await fetch(url, request);
        if (!response.ok || response.body === null) {
            const error: ErrorResponse = {
                error: 'ERROR'
            };
            return error
        }
        
        return response.json();
    }
}