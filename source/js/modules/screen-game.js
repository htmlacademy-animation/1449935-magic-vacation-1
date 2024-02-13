import {LetterByLetterAnimation} from "./letter-by-letter-animation";
import {setupPageTitleAnimation} from './setup-page-title-animation';
import {initGameWinTitleAnimation, initGameLooseTitleAnimation} from './init-game-result-title-animation';

export default () => {
  const titleAnimation = new LetterByLetterAnimation(
      `.game__title`,
      500,
      `game__title--animate`,
      `transform`
  );

  setupPageTitleAnimation(`.screen--game`, titleAnimation);

  const winTitlesSelectors = [
    `#result .result__title svg`,
    `#result2 .result__title svg`,
  ];

  winTitlesSelectors
    .map((selector) => document.querySelector(selector))
    .forEach((element, index) => {
      initGameWinTitleAnimation(
          element,
          `result${index + 1}_title_animation`,
          {
            animationDuration: `0.4s`,
            animationClass: `result_title_animation`
          }
      );
    });

  const looseTitle = document.querySelector(`#result3 .result__title svg`);

  initGameLooseTitleAnimation(
      looseTitle,
      `result3_title_animation`,
      {
        animationDuration: `0.5s`,
        animationClass: `result_title_animation`,
        stepsDelay: 0.08
      }
  );
};
