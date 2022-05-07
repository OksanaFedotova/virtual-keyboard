//import { main } from './createKey.js';
//import {keyboardLayout} from './keyboardLayout.js';
import form from './input.js';
import { Keyboard } from './Keyboard.js';
import { keyboardLayout } from './keyboardLayout.js';
//import {toggleCapsLock, backspace, tab, enter, shift} from './listeners.js';

const body = document.querySelector('body');
body.append(form);
const textarea = form.querySelector('textarea');

const main = document.createElement("div");
main.classList.add("keyboard");
body.append(main);

const properties = {
    value: '',
    capsed: false,
    shifted: false
}

const keyboard = new Keyboard(keyboardLayout, 'keyEnglish', properties);
keyboard.init();
const keysContainer = keyboard.getContainer();
const keys = keysContainer.querySelectorAll('button');
keysContainer.classList.add("keyboard__keys");
main.append(keysContainer)

const toggleCapsLock = () =>  {
    properties.capsed = !properties.capsed;
    keys.forEach((key) => {
       if(key.innerText.length < 2) {
            properties.capsed? key.innerText = key.innerText.toUpperCase(): key.innerText = key.innerText.toLowerCase();
        }
    })
};
const backspace = () => {
    properties.value = properties.value.substring(0, properties.value.length - 1);
    textarea.value = properties.value;
}
const tab = () => {
    properties.value += "\t"; 
    textarea.value = properties.value;
    textarea.focus();
}
const enter = () => {
    properties.value += "\n";
    textarea.value = properties.value;
    textarea.focus();
}
//const arrowDown 
const space = () => {
    properties.value += " ";
    textarea.value = properties.value;
}
const shift = () => {
    properties.shifted = !properties.shifted;
    keys.forEach((key) => {
        keyboardLayout.map((element) => {
            if(key.dataset.code === element.code) {
                if (element.shifted) {
                    key.innerHTML = properties.shifted? element.shifted: element.keyEnglish
                }
                if(key.innerHTML.length < 2) {
                    key.innerHTML = properties.shifted? key.innerHTML.toUpperCase(): key.innerHTML.toLowerCase();
                } 
                
            } 
        })
    })
}
const arrowLeft = (key) => {
    console.log(key.innerHTML)
    properties.value += "\b";
    textarea.value = properties.value;
    console.log(properties.value)
    //textarea.selectionStart = textarea.value.length - 1;
    textarea.focus();
}
const arrowDown = () => {
    properties.value += "\v";
    textarea.value = properties.value;
    textarea.focus();
}
const addSign = (key) => {
    properties.value += key.innerText;
    textarea.value = properties.value;
}
const listeners = {
    capsLock: toggleCapsLock,
    backspace: backspace,
    tab: tab, 
    enter: enter,
    space: space,
  //  arrowLeft: arrowLeft
   // shift: shift
}
keys.forEach((key) => {
    const listener = key.dataset.code[0].toLowerCase() + key.dataset.code.slice(1);
    if(listeners[listener]) {
        key.addEventListener('click', listeners[listener])
    } else if (listener == 'shiftLeft' || listener == 'shiftRight') {
        key.addEventListener('mousedown', () => {
                shift(keyboardLayout, keys);
                if (properties.shifted) {
                    key.addEventListener('mouseup', () => shift(keyboardLayout, keys));
                }
            });
    }
    else {
            key.addEventListener('click', () => {
                console.log(key.innerHTML, EventTarget)
            addSign(key)
        })
    }
})
document.onkeydown = function(event) {
    textarea.focus();
    textarea.selectionStart = textarea.value.length; 
    event.preventDefault();
     keys.forEach((key) => {
                if(event.code == key.dataset.code) {
                     key.classList.toggle('active');
                     switch (key.innerText) {
                        case "backspace": 
                            backspace()
                        break;
                        case "space_bar":
                            space();
                        break;
                        case "keyboard_capslock":
                            toggleCapsLock()
                            break;
                        case "keyboard_tab":
                            tab()
                        break;
                        case "keyboard_return":
                            enter()
                        break;
                        case "shift":
                           shift()
                        break;
                        }
                     if (key.innerText.length < 3) {
                        addSign(key);
                     }
                     //textarea.value = properties.value;
                 }
            })  
}
document.onkeyup = function(event) { 
    event.preventDefault();
    if (event.code == 'CapsLock') {
        toggleCapsLock()
    } else if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
        shift()
    }
}
