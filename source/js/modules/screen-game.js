import {LetterByLetterAnimation} from "./letter-by-letter-animation";
import {setupPageTitleAnimation} from './setup-page-title-animation';

export default () => {
  const titleAnimation = new LetterByLetterAnimation(
      `.game__title`,
      500,
      `game__title--animate`,
      `transform`
  );

  setupPageTitleAnimation(`.screen--game`, titleAnimation);
};
