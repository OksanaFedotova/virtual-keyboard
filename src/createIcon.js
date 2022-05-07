export default (icon_name, key, code) => {
    key.setAttribute('data-code', `${code}`);
    const icon = `<i class="material-icons">${icon_name}</i>`
    return icon;
};