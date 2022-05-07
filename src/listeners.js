export const toggleCapsLock = (keys, properties) =>  {
    properties.capsed = !properties.capsed;
    console.log(properties.capsed, keys);
    keys.forEach((key) => {
       if(key.innerText.length < 2) {
            properties.capsed? key.innerText = key.innerText.toUpperCase(): key.innerText = key.innerText.toLowerCase();
        }
    })
};
export const backspace = (value, textarea) => {
    console.log(value);
    value = value.substring(0, value.length - 1);
    console.log(value);
    textarea.value = value;
}
export const tab = (properties, textarea) => {
    properties.value += "\t"; 
    textarea.value = properties.value;
    textarea.focus();
}
export const enter = (properties, textarea) => {
    properties.value += "\n";
    textarea.value = properties.value;
}
//const arrowDown 
export const space = (properties, textarea) => {
    properties.value += " ";
    textarea.value = properties.value;
}
export const shift = (layout, keys, properties) => {
    properties.shifted = !properties.shifted;
    console.log(properties.shifted)
    keys.map((key) => {
        layout.map((element) => {
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
