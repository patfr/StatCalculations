import { getConfig } from "../types/config.js";
export function createHeader() {
    const config = getConfig();
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    for (const key of Object.keys(config)) {
        const li = document.createElement('li');
        li.textContent = config[key].name;
        ul.appendChild(li);
    }
    nav.appendChild(ul);
    const header = document.querySelector('header');
    if (header === null)
        return;
    header.appendChild(nav);
}
