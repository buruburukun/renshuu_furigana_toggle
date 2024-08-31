const waitForElm = (selector) => {
    return new Promise(resolve => {
        const alreadyExists = document.querySelector(selector);
        if (alreadyExists) {
            return resolve(alreadyExists);
        }
        const observer = new MutationObserver(_mutations => {
            const found = document.querySelector(selector);
            if (found) {
                observer.disconnect();
                resolve(found);
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
};

const syncCheckbox = (id) => {
    let state = document.documentElement.getAttribute('renshuu_furigana_toggle');
    if (state === null) {
        state = 'true';
    }
    document.getElementById(id).checked = state === 'true';
};

const addEventListener = (id, otherId) => {
    document.getElementById(id).addEventListener('click', () => {
        const state = document.getElementById(id).checked;
        document.documentElement.setAttribute('renshuu_furigana_toggle', state);
        syncCheckbox(otherId);
    });
};

const createCheckbox = (e, id, otherId) => {
    const newElement = document.createElement('li');
    newElement.innerHTML = `
        <input id="${id}" type="checkbox" checked/>
        <label for="${id}">Enable furigana in quizzes</label>
    `;
    e.appendChild(newElement);
    syncCheckbox(id);
    addEventListener(id, otherId);
};

waitForElm('#dheader').then(e => {
    createCheckbox(e, 'renshuu_furigana_toggle', 'renshuu_furigana_toggle_m');
});

waitForElm('#mheader').then(e => {
    createCheckbox(e, 'renshuu_furigana_toggle_m', 'renshuu_furigana_toggle');
});
