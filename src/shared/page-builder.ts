export function createElement<TKey extends keyof HTMLElementTagNameMap>(
    tag: TKey,
    assigner: (element: HTMLElementTagNameMap[TKey]) => void = () => {}
): HTMLElementTagNameMap[TKey] {
    const element = document.createElement(tag);

    assigner(element);

    return element;
}

export function createElementForEach<T>(
    array: T[],
    func: (item: T, index: number, array: T[]) => PageOptions<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>
): PageOptions<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>[] {
    const options: PageOptions<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>[] = [];

    array.forEach((item, index, arr) => {
        options.push(func(item, index, arr));
    });

    return options;
}

export function buildPage<TElement extends HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>(
    options: PageOptions<TElement>
): TElement {
    options.children?.forEach(o => {
        buildPage(o);

        options.parent.appendChild(o.parent);
    });

    return options.parent;
}

type PageOptions<TElement extends HTMLElementTagNameMap[keyof HTMLElementTagNameMap]> = {
    parent: TElement,
    children?: PageOptions<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>[],
}

export abstract class Page {
    private _page: HTMLElement;

    constructor(page: HTMLElement) {
        this._page = page;
    }

    mount(selector: Element | string): this {
        const parent = typeof selector == 'string' ? document.querySelector(selector) : selector;

        if (parent === null)
            throw new Error(`Element '${selector}' could not be found`);
        
        parent.appendChild(this._page);

        return this;
    }
}