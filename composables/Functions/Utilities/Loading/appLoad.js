export function initLoadingScreen(obj, start, end, duration, onCompletion) {
    let startTimestamp = null;
    let animationCompleted = false;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);

        obj.innerHTML = `${currentValue}%`;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else if (!animationCompleted && currentValue >= 97) {
            animationCompleted = true;
            obj.innerHTML = '100%';
            initiateCompletionAnimation(obj, onCompletion);
        }
    };
    window.requestAnimationFrame(step);
}

function initiateCompletionAnimation(obj, onCompletion) {
    obj.innerHTML = obj.textContent.replace(
        /([-A-Za-z0-9!$#%^&*@()_+|~=`{}\[\]:";'<>?,.\/À-ÿ]+)/g,
        '<div class="word">$1</div>'
    );

    let words = obj.querySelectorAll(".word");
    words.forEach((word) => {
        word.innerHTML = word.textContent.replace(
            /[-A-Za-z0-9!$#%^&*@()_+|~=`{}\[\]:";'<>?,.\/À-ÿ]/g,
            "<div class='perspective'><div class='letter'><div>$&</div></div></div>"
        );
    });

    if (onCompletion && typeof onCompletion === 'function') {
        onCompletion();
    }
}