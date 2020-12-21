import { Container } from 'inversify';
import { TYPES } from './inversify.types';

const container = new Container();
container.bind<any>(TYPES.Environment).toConstantValue(process.env);

export default container;