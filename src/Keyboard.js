//import createIconHTML from './createIcon.js';
import { createKey } from './createKey.js';

export class Keyboard {
    constructor(layout, language) {
        this.layout = layout;
        this.language = language;
       // this.properties = properties;
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
    // addListeners(keys, textarea, keyData) {
    //     if (this.language == 'keyCyrillic' && keyData['keyCyrillic'] == null) {
    //                 this.language = 'keyEnglish'
    //             }
        
    // }
    // getProperties() {
    //     return this.properties
    // }

}
// export const createKey = (properties, element, language, keys, textarea) => {
//     if (language == 'keyCyrillic' && element['keyCyrillic'] == null) {
//         language = 'keyEnglish'
//     }
//     const keyButton = document.createElement('button');

//     switch (element.code) {
//         case "Backspace":
//             keyButton.classList.add("keyboard__key--wide");
//             keyButton.innerHTML = createIconHTML("backspace", keyButton, element.code);
        
//             keyButton.addEventListener("click", backspace);
    
//             break;
//         case "Tab": 
//             keyButton.innerHTML = createIconHTML("keyboard_tab", keyButton, element.code);
//             keyButton.addEventListener("click", tab)
//             break
//         case "CapsLock":
//             keyButton.classList.add("keyboard__key--wide", "keyboard__key--activatable");
//             keyButton.innerHTML = createIconHTML("keyboard_capslock", keyButton, element.code);
    
//             keyButton.addEventListener("click", () => toggleCapsLock(keys));
    
//             break;
    
//         case "Enter":
//             keyButton.classList.add("keyboard__key--wide");
//             keyButton.innerHTML = createIconHTML("keyboard_return", keyButton, element.code);
    
//             keyButton.addEventListener("click", enter)
    
//             break;
    
//         case "Space":
//             keyButton.classList.add("keyboard__key--extra-wide");
//             keyButton.innerHTML = createIconHTML("space_bar", keyButton, element.code);
//             keyButton.addEventListener("click", () => {
//                 properties.value += " ";
//                 textarea.value = properties.value;
//             });
    
//             break;

//         case "ArrowLeft":
//             keyButton.innerHTML = createIconHTML("arrow_left", keyButton, element.code);
//             break;
//         case "ArrowUp":
//             keyButton.innerHTML = createIconHTML("arrow_drop_up", keyButton, element.code);
//             break;
//         case "ArrowRight":
//             keyButton.innerHTML = createIconHTML("arrow_right", keyButton, element.code);
//             break;
//         case "ArrowDown":
//             keyButton.innerHTML = createIconHTML("arrow_drop_down", keyButton, element.code);
//             break;
            
//         case "ShiftLeft":
//         case "ShiftRight":
//             keyButton.innerHTML = createIconHTML("shift", keyButton, element.code);
//             keyButton.addEventListener('mousedown', () => {
//                 shift(keyboardLayout, keys);
//                 if (properties.shifted) {
//                     keyButton.addEventListener('mouseup', () => shift(keyboardLayout, keys));
//                 }
//             });
//             break;
//         default:
//             keyButton.innerText = `${element[language]}`;
//             keyButton.setAttribute('data-code', `${element.code}`);
//             keyButton.addEventListener('click', (event) => {
//                 event.preventDefault();
//                 properties.value += keyButton.innerText;
//                 textarea.value = properties.value;
//             });
//             break;
//     }
//     return keyButton;
// }