import { Bsdal } from './bsdal.js';

const config: Config = {
    bsdal: {
        name: 'Bsdal',
        trans: [
            {
                name: 'Transcension',
                values: [ 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 99, 100, 200, 300, 400, 500 ],
                table: [
                    {
                        amount: 100,
                        formula: [
                            {
                                type: 'amount',
                            },
                            {
                                type: 'div',
                                amount: 4,
                            },
                        ],
                    },
                    {
                        amount: 20,
                        formula: [
                            {
                                type: 'amount',
                            },
                            {
                                type: 'sub',
                                amount: 20,
                            },
                            {
                                type: 'div',
                                amount: 10,
                            },
                            {
                                type: 'add',
                                amount: 1,
                            },
                        ],
                    },
                    {
                        amount: 0,
                        formula: [
                            {
                                type: 'const',
                                amount: 0,
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Ultra Transcension',
                caps: [ 3 ],
                values: [ 100, 150, 200, 250, 300 ],
                table: [
                    {
                        amount: 100,
                        formula: [
                            {
                                type: 'amount',
                            },
                            {
                                type: 'sub',
                                amount: 100,
                            },
                            {
                                type: 'div',
                                amount: 100,
                            },
                            {
                                type: 'add',
                                amount: 1,
                            },
                        ],
                    },
                    {
                        amount: 0,
                        formula: [
                            {
                                type: 'const',
                                amount: 0,
                            },
                        ],
                    },
                ],
            },
        ],
    },
};

export function getConfig(): Config {
    return config;
}

export function getConfigPage<TGame extends keyof Config, TPage extends keyof Config[TGame]>(game: TGame, page: TPage): Config[TGame][TPage] {
    return config[game][page];
}

export type Config = {
    bsdal: Bsdal,
};