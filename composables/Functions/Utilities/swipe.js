// Détecte un swipe tactile et appelle onStep(+1) pour swipe gauche/haut (suivant),
// onStep(-1) pour swipe droite/bas (précédent). Retourne une fonction de nettoyage.
export function addSwipeNav(onStep, threshold = 40) {
    let sx = 0, sy = 0, tracking = false;
    const onStart = (e) => {
        if (!e.touches || !e.touches.length) return;
        sx = e.touches[0].clientX;
        sy = e.touches[0].clientY;
        tracking = true;
    };
    const onEnd = (e) => {
        if (!tracking) return;
        tracking = false;
        const t = e.changedTouches && e.changedTouches[0];
        if (!t) return;
        const mx = sx - t.clientX;
        const my = sy - t.clientY;
        const d = Math.abs(mx) > Math.abs(my) ? mx : my;
        if (Math.abs(d) > threshold) onStep(d > 0 ? 1 : -1);
    };
    document.addEventListener('touchstart', onStart, { passive: true });
    document.addEventListener('touchend', onEnd, { passive: true });
    return () => {
        document.removeEventListener('touchstart', onStart);
        document.removeEventListener('touchend', onEnd);
    };
}
