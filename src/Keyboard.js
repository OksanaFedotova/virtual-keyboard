import { createKey } from './createKey.js';

export class Keyboard {
    constructor(layout, language) {
        this.layout = layout;
        this.language = language;
        this.keysContainer = ''
    }
    init() {
        this.keysContainer = document.createElement("div");
        const keys = this.layout.map((keyData) => createKey(keyData, this.language));
        keys.forEach((key) => {
        const insertLineBreak = ['Backspace', 'Enter', 'Backslash', 'ShiftRight'].indexOf(key.dataset.code) !== -1;
        insertLineBreak? this.keysContainer.append(key, document.createElement("br")):  this.keysContainer.append(key);
        })      
    }
    getContainer() {
        return this.keysContainer
    }
}
