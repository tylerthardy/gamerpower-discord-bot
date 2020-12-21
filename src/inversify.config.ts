import { Container } from 'inversify';
import { TYPES } from './inversify.types';

const container = new Container();
container.bind<string>(TYPES.Environment).toConstantValue(process.env.TOKEN ?? '');

export default container;