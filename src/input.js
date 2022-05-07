const form = document.createElement('form');
const textarea = document.createElement('textarea');
textarea.setAttribute('rows', '10');
textarea.setAttribute('cols', '45');
textarea.setAttribute('name', 'text');
textarea.autofocus = true;
form.append(textarea);

export default form;