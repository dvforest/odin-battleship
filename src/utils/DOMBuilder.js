export function createEl(tag, { classes = [], text = '', attrs = {}, children = [] } = {}) {
    const el = document.createElement(tag);
    if (classes.length) el.classList.add(...classes);
    if (text) el.textContent = text;
    for (let [key, value] of Object.entries(attrs)) {
        el.setAttribute(key, value);
    }
    children.forEach((child) => el.appendChild(child));
    return el;
}

export function clearHTML(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}
