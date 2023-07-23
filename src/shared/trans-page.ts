import { Config, getConfigPage } from "../types/config.js";
import { TransFormulaItem, TransItem } from "../types/trans.js";
import { Page, buildPage, createElement, createElementForEach } from "./page-builder.js";

function calculateTrans(amount: number, formula: TransItem[]): number {
    const calc = findTransFormula(amount, formula);
    
    if (calc === undefined)
        return 0;
    
    let trans = 0;

    calc.forEach(f => {
        switch(f.type) {
            case 'amount':
                trans += amount;
                break;
            case 'const':
                trans = f.amount;
                break;
            case 'add':
                trans += f.amount;
                break;
            case 'sub':
                trans -= f.amount;
                break;
            case 'div':
                trans /= f.amount;
                break;
            default:
                throw new Error('Not all cases covered');
        }
    });

    return trans;
}

function formatTimes(times: number): string {
    if (times <= 0)
        return '0th';
    
    const str = times.toString();

    if (times >= 11 && times <= 13)
        return str + 'th';

    if (str.endsWith('1'))
        return str + 'st';
    else if (str.endsWith('2'))
        return str + 'nd';
    else if (str.endsWith('3'))
        return str + 'rd';
    else
        return str + 'th';
}

const findTransFormula = (amount: number, formula: TransItem[]): TransFormulaItem[] | undefined => getTransFormula(amount, formula)?.formula;
const getTransFormula = (amount: number, formula: TransItem[]): TransItem | undefined => formula.find(f => f.amount <= amount) ?? formula[formula.length - 1];
const hasValue = (amount: number, formula: TransItem[]): boolean => formula.find(v => v.amount === amount) != undefined;

export class TranscensionPage<TGame extends keyof Config> extends Page {
    constructor(game: TGame) {
        const data = getConfigPage(game, 'trans');

        const page = buildPage({
            parent: createElement('details'),
            children: [
                { parent: createElement('summary', e => e.textContent = 'Transension Calculator') },
                ...createElementForEach(data, trans => {
                    const label = createElement('div', e => e.textContent = `0 ${trans.name}`);
        
                    return {
                        parent: createElement('details'),
                        children: [{
                            parent: createElement('summary', e => e.textContent = trans.name),
                        }, {
                            parent: createElement('section'),
                            children: [{
                                parent: createElement('h2', e => e.textContent = trans.name),
                            }, {
                                parent: createElement('input', e => {
                                    e.type = 'number';
                                    e.min = '0';
                                    e.placeholder = '0';
                                    e.addEventListener('change', () => label.textContent = `${calculateTrans(Number.parseInt(e.value), trans.table)} ${trans.name}`);
                                }),
                            }, {
                                parent: label,
                            }],                        
                        }, {
                            parent: createElement('details'),
                            children: [{
                                parent: createElement('summary', e => e.textContent = 'Table')
                            }, {
                                parent: createElement('table'),
                                children: [
                                    {
                                        parent: createElement('tr'),
                                        children: [
                                            { parent: createElement('th', e => e.textContent = "Amount") },
                                            { parent: createElement('th', e => e.textContent = trans.name) },
                                        ],
                                    },
                                    ...createElementForEach(trans.values, val => {
                                        return {
                                            parent: createElement('tr'),
                                            children: [
                                                { parent: createElement('td', e => e.innerHTML = hasValue(val, trans.table) ? `<b>${val}<b/>` : val.toString()) },
                                                { parent: createElement('td', e => e.textContent = calculateTrans(val, trans.table).toString()) },
                                            ],
                                        };
                                    })
                                ],
                            }],
                        },
                        (() => trans.caps !== undefined ? {
                            parent: createElement('details'),
                            children: [{
                                parent: createElement('summary', e => e.textContent = 'Caps')
                            }, {
                                parent: createElement('table'),
                                children: [
                                    {
                                        parent: createElement('tr'),
                                        children: [
                                            { parent: createElement('th', e => e.textContent = "Times") },
                                            { parent: createElement('th', e => e.textContent = "Amount") },
                                        ],
                                    },
                                    ...createElementForEach(trans.caps, (val, i) => {
                                        return {
                                            parent: createElement('tr'),
                                            children: [
                                                { parent: createElement('td', e => e.textContent = formatTimes(i + 1)) },
                                                { parent: createElement('td', e => e.textContent = val.toString()) },
                                            ],
                                        };
                                    })
                                ],
                            }],
                        } : { parent: createElement('div') })()
                        ],
                    };
                }),
            ],
        });

        super(page);        
    }
}