import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase";

export function textReveal(element, reverse) {
    gsap.registerPlugin(CustomEase);

    if (element == ".reveal-text-menu" && reverse) {
        const lines = document.querySelectorAll(".text-words");

        let textTl = gsap.timeline();
        textTl.to(lines, {
            yPercent: 120,
            duration: 0.6,
            ease: CustomEase.create("custom", "M0,0 C0.425,0.005 0,1 1,1 "),
        });
        return;
    }

    if (element == '.reveal-text-project' && reverse) {
        const lines = document.querySelectorAll(".text-words");

        let reverseTextTl = gsap.timeline();
        reverseTextTl.to(lines, {
            yPercent: 200,
            stagger: 0.025,
            duration: 0.7,
            ease: CustomEase.create("custom", "M0,0 C0.425,0.005 0,1 1,1 ")
        });
        return;
    }

    if (reverse) {
        const lines = document.querySelectorAll(".text-words");
        if (lines.length == 0) {return;}
        let reverseTextTl = gsap.timeline();
        reverseTextTl.to(lines, {
            yPercent: -200,
            stagger: 0.025,
            duration: 1.6,
            ease: CustomEase.create("custom", "M0,0 C0.425,0.005 0,1 1,1 ")
        });
        return;
    }

    let splitWords = function (selector) {
        var elements = document.querySelectorAll(selector);

        elements.forEach(function (el) {
            el.dataset.splitText = el.textContent;
            el.innerHTML = el.textContent
                .split(/\s/)
                .map(function (word) {
                    return word
                        .split("-")
                        .map(function (word) {
                            return '<span class="text-word">' + word + "</span>";
                        })
                        .join('<span class="hyphen">-</span>');
                })
                .join('<span class="whitespace"> </span>');
        });
    };

    let splitLines = function (selector) {
        var elements = document.querySelectorAll(selector);

        splitWords(selector);

        elements.forEach(function (el) {
            var lines = getLines(el);

            var wrappedLines = "";
            lines.forEach(function (wordsArr) {
                wrappedLines += '<span class="line"><span class="text-words">';
                wordsArr.forEach(function (word) {
                    wrappedLines += word.outerHTML;
                });
                wrappedLines += "</span></span>";
            });
            el.innerHTML = wrappedLines;
        });
    };

    let getLines = function (el) {
        var lines = [];
        var line;
        var words = el.querySelectorAll("span");
        var lastTop;
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (word.offsetTop != lastTop) {
                if (!word.classList.contains("whitespace")) {
                    lastTop = word.offsetTop;

                    line = [];
                    lines.push(line);
                }
            }
            line.push(word);
        }
        return lines;
    };

    splitLines(element);

    let revealText = document.querySelectorAll(element);

    let revealLines = revealText.forEach((element) => {
        const lines = element.querySelectorAll(".text-words");

        let textTl = gsap.timeline();
        textTl.set(element, { autoAlpha: 1 });
        textTl.from(lines, {
            yPercent: 120,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.25,
        }, 0.5);
    });
};