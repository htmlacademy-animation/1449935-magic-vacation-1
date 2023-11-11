import {LetterByLetterAnimation} from "./letter-by-letter-animation";

export default () => {
  let firstSlide = document.querySelector(`.slider__item:first-child`);

  const titleAnimation = new LetterByLetterAnimation(
      `.slider__item-title`,
      800,
      `slider__item-title--animate`,
      `transform`
  );

  let prevClassName = ``;

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.attributeName === `class`) {
        const className = mutation.target.className;

        if (className === prevClassName) {
          return;
        }

        if (mutation.target.classList.contains(`swiper-slide-active`)) {
          setTimeout(() => {
            titleAnimation.start();
          }, 500);
        } else {
          titleAnimation.stop();
        }

        prevClassName = className;
      }
    });
  });

  observer.observe(firstSlide, {attributes: true});
};
