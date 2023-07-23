import { Config, getConfig } from "../types/config.js";

export function createHeader(): void {
    const config = getConfig();
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');

    for (const key of Object.keys(config)) {
        const li = document.createElement('li');

        li.textContent = config[key as keyof Config].name;

        ul.appendChild(li);
    }

    nav.appendChild(ul);

    const header = document.querySelector('header');

    if (header === null)
        return;

    header.appendChild(nav);
}