require('dotenv').config();
import container from './inversify.config';
import {TYPES} from './inversify.types';

console.log('Application started');
const environment = container.get<any>(TYPES.Environment);
console.log(`Token: ${environment.TOKEN}`);
