import {LetterByLetterAnimation} from "./letter-by-letter-animation";
import {setupPageTitleAnimation} from './setup-page-title-animation';

export default () => {
  const titleAnimation = new LetterByLetterAnimation(
      `.intro__title`,
      800,
      `intro__title--animate`,
      `transform`
  );

  setupPageTitleAnimation(`.screen--intro`, titleAnimation, 500);

  const dateAnimation = new LetterByLetterAnimation(
      `.intro__date`,
      500,
      `intro__date--animate`,
      `transform`,
  );

  setupPageTitleAnimation(`.screen--intro`, dateAnimation, 1200);
};
