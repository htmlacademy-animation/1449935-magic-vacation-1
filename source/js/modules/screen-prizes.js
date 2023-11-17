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
};
