import {LetterByLetterAnimation} from "./letter-by-letter-animation";
import {setupPageTitleAnimation} from './setup-page-title-animation';
import {initGameWinTitleAnimation, initGameLooseTitleAnimation} from './init-game-result-title-animation';
import {Countdown} from './countdown';

const formatTime = (time) => {
  const timeSec = time / 1000;
  const minutes = Math.floor(timeSec / 60);
  const formattedMinutes = String(minutes).padStart(2, 0);
  const seconds = Math.round(timeSec) % 60;
  const formattedSeconds = String(seconds).padStart(2, 0);
  return `${formattedMinutes}:${formattedSeconds}`;
};

const GAME_SESSION_TIME = 1000 * 60 * 5; // время в мс

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

  const timeoutEl = document.querySelector(`.game__counter`);
  timeoutEl.textContent = formatTime(GAME_SESSION_TIME);

  const countdown = new Countdown(GAME_SESSION_TIME);

  countdown.onUpdate = (remainingTime) => {
    const formattedTime = formatTime(remainingTime);
    timeoutEl.textContent = formattedTime;
  };

  countdown.onFinish = () => {
    // todo: анимация закончена
  };

  document.body.addEventListener(`screenChanged`, (evt) => {
    const {
      detail: {screenName},
    } = evt;

    if (screenName === `game`) {
      countdown.start();
    } else {
      countdown.stop();
      timeoutEl.textContent = formatTime(GAME_SESSION_TIME);
    }
  });
};
