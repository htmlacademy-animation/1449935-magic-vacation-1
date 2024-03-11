import {LetterByLetterAnimation} from "./letter-by-letter-animation";
import {setupPageTitleAnimation} from './setup-page-title-animation';
import {Countup} from './countup';

export default () => {
  const titleAnimation = new LetterByLetterAnimation(
      `.prizes__title`,
      500,
      `prizes__title--animate`,
      `transform`
  );

  setupPageTitleAnimation(`.screen--prizes`, titleAnimation);

  const mainPrizeAnimation = document.querySelector(`#baloon_entry_animation`);

  // анимация цифр 2-го приза
  const secondPrizeValueAnimation = new Countup(1, 7, 500, 12);

  const secondPrizeValueEl = document.querySelector(`.prizes__item--cases b`);

  secondPrizeValueAnimation.onUpdate = (val) => {
    secondPrizeValueEl.textContent = val;
  };

  // анимация цифр 3-го приза
  const thirdPrizeValueAnimation = new Countup(11, 900, 1000, 12);

  const thirdPrizeValueEl = document.querySelector(`.prizes__item--codes b`);

  thirdPrizeValueAnimation.onUpdate = (val) => {
    thirdPrizeValueEl.textContent = val;
  };

  let played = false;

  document.body.addEventListener(`screenChanged`, (evt) => {
    const {
      detail: {screenName},
    } = evt;

    if (!mainPrizeAnimation) {
      return;
    }

    if (screenName === `prizes`) {
      setTimeout(() => {
        if (!played) {
          mainPrizeAnimation.beginElement();
          played = true;
        }
      }, 250);

      setTimeout(() => {
        secondPrizeValueEl.textContent = 1;
        secondPrizeValueAnimation.start();
      }, 5000);

      setTimeout(() => {
        thirdPrizeValueEl.textContent = 11;
        thirdPrizeValueAnimation.start();
      }, 6500);
    } else {
      secondPrizeValueAnimation.stop();
      thirdPrizeValueAnimation.stop();
    }
  });
};
