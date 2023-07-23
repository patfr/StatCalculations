export function wrapElement(element) {
    return { parent: element };
}
export function createElement(tag, assigner = () => { }) {
    const element = document.createElement(tag);
    assigner(element);
    return element;
}
export function createElementForEach(array, func) {
    const options = [];
    array.forEach((item, index, arr) => {
        options.push(func(item, index, arr));
    });
    return options;
}
export function buildPage(options) {
    options.children?.forEach(o => {
        buildPage(o);
        options.parent.appendChild(o.parent);
    });
    return options.parent;
}
export class Page {
    _page;
    constructor(page) {
        this._page = page;
    }
    mount(selector) {
        const parent = typeof selector == 'string' ? document.querySelector(selector) : selector;
        if (parent === null)
            throw new Error(`Element '${selector}' could not be found`);
        parent.appendChild(this._page);
        return this;
    }
}
