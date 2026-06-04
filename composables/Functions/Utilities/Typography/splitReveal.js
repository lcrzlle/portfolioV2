import gsap from 'gsap'
import { CustomEase } from "gsap/CustomEase";

export function splitReveal(selector, reverse) {
    gsap.registerPlugin(CustomEase);
    let durationReverse = null;
    let durationTime = null;
    let direction = -1;

    const textRevealElements = document.querySelectorAll(selector);

    textRevealElements.forEach((element) => {

        if (selector == '.reveal-loading') {
            textRevealElements[0].parentElement.style.visibility = 'visible';
        }

        if ((selector == '.reveal-menu' || selector == '.reveal-preview') && reverse) {
            durationReverse = 0.7;
            direction = 1;
        }
        else {
            durationReverse = 1.6;
        }
        if (selector == '.reveal-loading') {
            durationTime = 0.7;
        } else {
            durationTime = 1.6;
        }

        if (reverse) {
            const letters = element.querySelectorAll(".letter");
            let reverseTitleTl = gsap.timeline();
            reverseTitleTl.fromTo(
                letters,
                {
                    rotationX: 0.1,
                    y: 0,
                },
                {
                    transformOrigin: "center",
                    rotationX: 90,
                    y: 100 * direction,
                    stagger: 0.015,
                    duration: durationReverse,
                    ease: CustomEase.create("custom", "M0,0 C0.425,0.005 0,1 1,1 ")
                },
            );
            return
        }

        element.innerHTML = element.textContent.replace(
            /([-A-Za-z0-9!$#%^&*@()_+|~=`{}\[\]:";'<>?,.\/À-ÿ]+)/g,
            '<div class="word">$1</div>'
        );

        let words = element.querySelectorAll(".word");
        words.forEach((word) => {
            word.innerHTML = word.textContent.replace(
                /[-A-Za-z0-9!$#%^&*@()_+|~=`{}\[\]:";'<>?,.\/À-ÿ]/g,
                "<div class='perspective'><div class='letter'><div>$&</div></div></div>"
            );
        });

        const letters = element.querySelectorAll(".letter");

        let titleTl = gsap.timeline();
        titleTl.set(element, { autoAlpha: 1 });
        titleTl.fromTo(
            letters,
            {
                transformOrigin: "center",
                rotationX: 90,
                y: 100
            },
            {
                rotationX: 0.1,
                y: 0,
                stagger: 0.015,
                duration: durationTime,
                ease: CustomEase.create("custom", "M0,0 C0.425,0.005 0,1 1,1 ")
            }
        );
    });
}


