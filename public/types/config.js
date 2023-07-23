import config from '../assets/config.json' assert { type: 'json' };
export function getConfig() {
    return config;
}
export function getConfigPage(game, page) {
    return config[game][page];
}
