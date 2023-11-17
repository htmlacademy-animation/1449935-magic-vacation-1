import {LetterByLetterAnimation} from "./letter-by-letter-animation";
import {setupPageTitleAnimation} from './setup-page-title-animation';

export default () => {
  const titleAnimation = new LetterByLetterAnimation(
      `.rules__title`,
      500,
      `rules__title--animate`,
      `transform`
  );

  setupPageTitleAnimation(`.screen--rules`, titleAnimation);
};
