export type Trans = {
    name: string,
    caps?: number[],
    values: number[],
    table: TransItem[],
};

export type TransItem = {
    amount: 20,
    formula: TransFormulaItem[],
};

export type TransBase = {
    type: 'amount' | 'const' | 'add' | 'sub' | 'div',
};

export interface ITransAmount extends TransBase {
    type: 'amount',
};

export interface ITransConst extends TransBase {
    type: 'const',
    amount: number,
};

export interface ITransAdd extends TransBase {
    type: 'add',
    amount: number,
};

export interface ITransSubtract extends TransBase {
    type: 'sub',
    amount: number,
};

export interface ITransDivide extends TransBase {
    type: 'div',
    amount: number,
};

export type TransFormulaItem = 
    | ITransAmount 
    | ITransConst
    | ITransAdd
    | ITransSubtract 
    | ITransDivide;