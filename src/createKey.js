const createIconHTML = (icon_name, key, code) => {
    key.setAttribute('data-code', `${code}`);
    const icon = `<i class="material-icons">${icon_name}</i>`
    return icon;
};

export const createKey = (element, language) => {
    const keyButton = document.createElement('button');

    switch (element.code) {
        case "Backspace":
            keyButton.classList.add("keyboard__key--wide");
            keyButton.innerHTML = createIconHTML("backspace", keyButton, element.code);
            break;
        case "Tab": 
            keyButton.innerHTML = createIconHTML("keyboard_tab", keyButton, element.code);

            break
        case "CapsLock":
            keyButton.classList.add("keyboard__key--wide", "keyboard__key--activatable");
            keyButton.innerHTML = createIconHTML("keyboard_capslock", keyButton, element.code);
            break;
    
        case "Enter":
            keyButton.classList.add("keyboard__key--wide");
            keyButton.innerHTML = createIconHTML("keyboard_return", keyButton, element.code);
            break;
    
        case "Space":
            keyButton.classList.add("keyboard__key--extra-wide");
            keyButton.innerHTML = createIconHTML("space_bar", keyButton, element.code);
            break;

        case "ArrowLeft":
            keyButton.innerHTML = createIconHTML("arrow_left", keyButton, element.code);
            break;
        case "ArrowUp":
            keyButton.innerHTML = createIconHTML("arrow_drop_up", keyButton, element.code);
            break;
        case "ArrowRight":
            keyButton.innerHTML = createIconHTML("arrow_right", keyButton, element.code);
            break;
        case "ArrowDown":
            keyButton.innerHTML = createIconHTML("arrow_drop_down", keyButton, element.code);
            break;
            
        case "ShiftLeft":
        case "ShiftRight":
            keyButton.innerHTML = createIconHTML("keyboard_arrow_up", keyButton, element.code);
            break;
        default:
            keyButton.innerText = `${element[language]}`;
            keyButton.setAttribute('data-code', `${element.code}`);
            break;
    }
    keyButton.classList.add('keyboard__key')
    return keyButton;
}

