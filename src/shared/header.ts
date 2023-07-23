import { Config, getConfig } from "../types/config.js";
import { PageOptions, buildPage, createElement, createElementForEach, wrapElement } from "./page-builder.js";

const config = getConfig();

export function createHeader(): void {
    const header = document.querySelector('header');

    if (header === null)
        return;

    buildPage({
        parent: header,
        children: [{
            parent: createElement('nav'),
            children: [{
                parent: createElement('ul'),
                children: createElementForEach(Object.keys(config), createNavItem),
            }],
        }],
    });
}

const createNavItem = (key: string): PageOptions<HTMLLIElement> => 
    wrapElement(createElement('li', e => e.textContent = config[key as keyof Config].name));