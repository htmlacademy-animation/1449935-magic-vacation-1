import {LetterByLetterAnimation} from "./letter-by-letter-animation";
import {setupPageTitleAnimation} from './setup-page-title-animation';

export default () => {
  const titleAnimation = new LetterByLetterAnimation(
      `.prizes__title`,
      500,
      `prizes__title--animate`,
      `transform`
  );

  setupPageTitleAnimation(`.screen--prizes`, titleAnimation);

  const mainPrizeAnimation = document.querySelector(`#baloon_entry_animation`);

  document.body.addEventListener(`screenChanged`, (evt) => {
    const {
      detail: {screenName},
    } = evt;

    if (screenName === `prizes`) {
      if (mainPrizeAnimation) {
        setTimeout(() => {
          mainPrizeAnimation.beginElement();
        }, 250);
      }
    } else {
      if (mainPrizeAnimation) {
        mainPrizeAnimation.endElement();
      }
    }
  });
};
