import config from '../assets/config.json' assert { type: 'json' };
import { Bsdal } from './bsdal.js';

export function getConfig(): Config {
    return config as Config;
}

export function getConfigPage<TGame extends keyof Config, TPage extends keyof Config[TGame]>(game: TGame, page: TPage): Config[TGame][TPage] {
    return (config as Config)[game][page];
}

export type Config = {
    bsdal: Bsdal,
};