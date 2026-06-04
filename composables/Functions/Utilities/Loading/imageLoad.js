export function ensureImagesLoaded(selector) {
    const images = document.querySelectorAll(selector);
    const loadPromises = [...images].map(img => {
        return new Promise(resolve => {
            if (img.complete && img.naturalHeight !== 0) {
                resolve();
            } else {
                img.addEventListener('load', resolve, { once: true });
            }
        });
    });
    return Promise.all(loadPromises);
}

export function waitForImageToLoad(imageElement) {
    return new Promise((resolve) => {
        if (imageElement.complete && imageElement.naturalHeight !== 0) {
            resolve();
        } else {
            imageElement.addEventListener('load', resolve, { once: true });
        }
    });
}

export const addImageRef = el => {
    if (el) {
        imageRefs.value.push(el);
    }
};