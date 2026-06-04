export function lockUI() {
    const container = document.getElementById('container')
    container.style.pointerEvents = 'none';
}

export function unlockUI() {
    const container = document.getElementById('container')
    container.style.pointerEvents = 'auto';
}

export function unlockElement(selector) {
    const element = document.getElementById(selector);
    element.style.pointerEvents = 'auto';
}

export function lockElement(selector) {
    const element = document.getElementById(selector);
    element.style.pointerEvents = 'none';
}

export function lockAllElements(selector, lock) {
    let status = lock ? 'none' : 'auto';
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.style.pointerEvents = status;
    });
}

export function updateNavigationHeader(route) {
    const navHeader = document.getElementById('navHeader');
    const links = navHeader.querySelectorAll('.button-link');

    links.forEach((link) => {
        link.classList.remove('is-active');
    });
    if (route.name == 'index') {
        links[0].classList.add('is-active');
    }
    else if (route.name == 'about') {
        links[2].classList.add('is-active');
    }
}

export function resetNavHeader() {
    let navHeader = document.getElementById('navHeader');
    if (!navHeader) return;
    let navLinks = navHeader.querySelectorAll('.button-link');
    navLinks.forEach((link) => {
        if (link.parentElement && link.parentElement.classList.contains('router-link-active')) {
            setTimeout(() => { link.classList.add('is-active'); }, 1000);
        } else {
            link.classList.remove('is-active');
        }
    });
}

export function handleButtonState(route) {
    const activeLink = document.querySelector('.router-link-active');
    if (!activeLink) return;

    const buttonLink = activeLink.querySelector('.button-link');
    if (buttonLink) {
        setTimeout(() => {
            buttonLink.classList.add('is-active');
        }, 1000);
    } else {
        const navLinks = document.querySelectorAll('.nav-link');
        if (navLinks[1]) {
            const target = navLinks[1].querySelector('.button-link');
            setTimeout(() => {
                if (target) target.classList.add('is-active');
            }, 1000);
        }
    }
}
