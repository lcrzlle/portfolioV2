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
    let navLinks = navHeader.querySelectorAll('.button-link');

    navLinks.forEach((link) => {
        if (link.parentElement.classList.contains('router-link-active')) {
            setTimeout(() => {
                link.classList.add('is-active');
            }, 1000);
        } else {
            link.classList.remove('is-active');
        }
    });

}

export function handleButtonState(route) {
    let buttonLink;

    if (document.querySelector('.router-link-active')) {
        buttonLink = document.querySelector('.router-link-active')
            .querySelector('.button-link');
        if (buttonLink) {
            setTimeout(() => {
                buttonLink.classList.add('is-active');
            }, 1000);
        } else if (route.name !== 'index' || route.name !== 'about' || route.name !== 'credits') {
            buttonLink = document.querySelectorAll('.nav-link');
            setTimeout(() => {
                buttonLink[1].querySelector('.button-link').classList.add('is-active');
            }, 1000);
        }
    }
}