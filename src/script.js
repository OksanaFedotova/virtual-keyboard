/* eslint-disable default-case */
/* eslint-disable func-names */
/* eslint-disable indent */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import form from './form.js';
import Keyboard from './Keyboard.js';
import { keyboardLayout } from './keyboardLayout.js';

const body = document.querySelector('body');
body.append(form);
const textarea = form.querySelector('textarea');

const infoContainer = document.createElement('div');
const info = document.createElement('span');
info.innerText = 'Клавиатура создана в операционной системе Mac. Для переключения языка комбинация: левыe ctrl + alt.';
infoContainer.append(info);
infoContainer.classList.add('info-container');
body.append(infoContainer);

const main = document.createElement('div');
main.classList.add('keyboard');
body.append(main);

const properties = {
  value: '',
  capsed: false,
  shifted: false,
};
let language;
const myStorage = window.localStorage;
if (myStorage.getItem('language')) {
  language = myStorage.getItem('language');
} else {
  language = 'keyEnglish';
}
const createKeyboard = () => {
    const actives = document.querySelectorAll('.active');
  const keyboard = new Keyboard(keyboardLayout, language, properties);
  keyboard.setActives(actives);
  keyboard.init();
  const keysContainer = keyboard.getContainer();
  keysContainer.classList.add('keyboard__keys');
  if (main.firstChild) {
    main.firstChild.remove();
  }
  main.append(keysContainer);
  return keysContainer;
};

const pressedKeys = new Set();
const switchLanguage = () => {
  language = myStorage.getItem('language');
  language = language === 'keyEnglish' ? 'keyCyrillic' : 'keyEnglish';
  myStorage.clear();
  myStorage.setItem('language', language);
  keysContainer = createKeyboard();
  keys = keysContainer.querySelectorAll('button');
  addListeners();
};

let keysContainer = createKeyboard();
let keys = keysContainer.querySelectorAll('button');

const toggleCapsLock = () => {
   properties.capsed = !properties.capsed;
  keys.forEach((key) => {
    if (key.innerText.length < 2) {
      properties.capsed ? key.innerText = key.innerText.toUpperCase() : key.innerText = key.innerText.toLowerCase();
    }
  });
};
const backspace = () => {
  properties.value = properties.value.substring(0, properties.value.length - 1);
  textarea.value = properties.value;
};
const tab = () => {
  properties.value += '\t';
  textarea.value = properties.value;
  textarea.focus();
};
const enter = () => {
  properties.value += '\n';
  textarea.value = properties.value;
  textarea.focus();
};

const space = () => {
  properties.value += ' ';
  textarea.value = properties.value;
};
const shift = () => {
  properties.shifted = !properties.shifted;
  keys.forEach((key) => {
    keyboardLayout.map((element) => {
      if (key.dataset.code === element.code) {
        if (language === 'keyEnglish') {
          if (element.shifted) {
            key.innerHTML = properties.shifted ? element.shifted : element.keyEnglish;
          }
        } else if (element.cyrillicShifted) {
          key.innerHTML = properties.shifted ? element.cyrillicShifted : element.keyCyrillic || element.keyEnglish;
        }
        if (key.innerHTML.length < 2) {
          key.innerHTML = properties.shifted ? key.innerHTML.toUpperCase() : key.innerHTML.toLowerCase();
        }
      }
    });
  });
};

const arrowLeft = () => {
  properties.value += '◀';
  textarea.value = properties.value;
  textarea.focus();
};
const arrowUp = () => {
  properties.value += '▲';
  textarea.value = properties.value;
  textarea.focus();
};
const arrowRight = () => {
  properties.value += '▶';
  textarea.value = properties.value;
  textarea.focus();
};
const arrowDown = () => {
  properties.value += '▼';
  textarea.value = properties.value;
  textarea.focus();
};
const addSign = (key) => {
  properties.value += key.innerText;
  textarea.value = properties.value;
};
const listeners = {
    capsLock: toggleCapsLock,
  shiftLeft: shift,
  shiftRigh: shift,
  backspace,
  tab,
  enter,
  space,
  arrowLeft,
  arrowDown,
  arrowUp,
  arrowRight,
};
const addListeners = () => {
  keys.forEach((key) => {
    const listener = key.dataset.code[0].toLowerCase() + key.dataset.code.slice(1);
    if (listener === 'capsLock') {
        key.addEventListener('click', (e) => {
            toggleCapsLock();
            properties.capsed ? e.currentTarget.classList.add('active') : e.currentTarget.classList.remove('active');
        });
      } else if (listener === 'shiftLeft' || listener === 'shiftRight') {
        key.addEventListener('mousedown', () => {
          key.classList.add('active');
          shift(keyboardLayout, keys);
          if (properties.shifted) {
            key.addEventListener('mouseup', () => {
                key.classList.remove('active');
                shift(keyboardLayout, keys);
            });
          }
        });
      } else if (listeners[listener]) {
        key.addEventListener('click', listeners[listener]);
        } else if (key.innerText.length < 3) {
      key.addEventListener('click', () => {
        addSign(key);
      });
    }
  });
};
addListeners();
document.onkeydown = function (event) {
  textarea.focus();
  textarea.selectionStart = textarea.value.length;
  event.preventDefault();
  keys.forEach((key) => {
    if (event.code === key.dataset.code) {
      key.classList.add('active');
      switch (key.innerText) {
        case 'backspace':
          backspace();
          break;
        case 'space_bar':
          space();
          break;
        case 'keyboard_capslock':
           properties.capsed = false;
          toggleCapsLock();
          break;
        case 'keyboard_tab':
          tab();
          break;
        case 'keyboard_return':
          enter();
          break;
        case 'keyboard_arrow_up':
          if (properties.shifted) {
            properties.shifted = false;
          }
          shift();
          break;
        case 'Control':
        case 'Alt':
          pressedKeys.add(event.code);
          if (pressedKeys.has('ControlLeft') && pressedKeys.has('AltLeft')) {
            switchLanguage();
          }
          break;
      }
      if (key.innerText.length < 3) {
        addSign(key);
      }
    }
  });
};
document.onkeyup = function (event) {
  event.preventDefault();
  switch (event.code) {
    case 'CapsLock':
        properties.capsed = true;
        toggleCapsLock();
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      shift();
      break;
    case 'ControlLeft':
      pressedKeys.delete(event.code);
      break;
    case 'AltLeft':
      pressedKeys.delete(event.code);
      break;
  }
  keys.forEach((key) => key.classList.remove('active'));
};
