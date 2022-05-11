/* eslint-disable no-unused-expressions */
import { createKey } from './createKey.js';

export default class Keyboard {
  constructor(layout, language) {
    this.layout = layout;
    this.language = language;
    this.keysContainer = '';
    this.actives = false;
  }

  init() {
    this.keysContainer = document.createElement('div');
    const keys = this.layout.map((keyData) => createKey(keyData, this.language));
    if (this.actives) {
      this.actives.forEach((active) => {
        const attr = active.dataset.code;
        const keyActive = document.querySelector(`[data-code=${attr}]`);
        keyActive.classList.add('active');
      });
    }
    keys.forEach((key) => {
      const insertLineBreak = ['Backspace', 'Enter', 'Backslash', 'ShiftRight'].indexOf(key.dataset.code) !== -1;
      insertLineBreak ? this.keysContainer.append(key, document.createElement('br')) : this.keysContainer.append(key);
    });
  }

  setActives(actives) {
    this.actives = actives;
  }

  getContainer() {
    return this.keysContainer;
  }
}
