// eslint-disable-next-line no-unused-vars
import {LetterByLetterAnimation} from './letter-by-letter-animation';

/**
 * @param {string} page
 * @param {LetterByLetterAnimation} animation
 * @param {number} delay animation delay in ms
 */
export const setupPageTitleAnimation = (page, animation, delay) => {
  const pageElement = document.querySelector(page);
  let prevClassName = ``;

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === `class`) {
        const className = mutation.target.className;

        if (className === prevClassName) {
          return;
        }

        if (mutation.target.classList.contains(`active`)) {
          // eslint-disable-next-line eqeqeq
          if (delay == undefined) {
            animation.start();
          } else {
            setTimeout(() => {
              animation.start();
            }, delay);
          }
        } else {
          animation.stop();
        }

        prevClassName = className;
      }
    });
  });

  observer.observe(pageElement, {attributes: true});
};
