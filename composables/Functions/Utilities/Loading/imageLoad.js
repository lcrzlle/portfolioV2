export function ensureImagesLoaded(selector) {
    const images = document.querySelectorAll(selector);
    if (!images.length) return Promise.resolve();
    const loadPromises = [...images].map(img => {
        return new Promise(resolve => {
            if (img.complete) {
                resolve();
            } else {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
                setTimeout(resolve, 4000);
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