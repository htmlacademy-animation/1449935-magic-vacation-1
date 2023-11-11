import {LetterByLetterAnimation} from "./letter-by-letter-animation";

export default () => {
  const titleAnimation = new LetterByLetterAnimation(
      `.intro__title`,
      800,
      `intro__title--animate`,
      `transform`
  );

  setTimeout(() => {
    titleAnimation.start();
  }, 500);

  const dateAnimation = new LetterByLetterAnimation(
      `.intro__date`,
      500,
      `intro__date--animate`,
      `transform`,
  );

  setTimeout(() => {
    dateAnimation.start();
  }, 2000);
};
