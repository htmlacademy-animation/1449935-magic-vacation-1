// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import screenIntro from './modules/screen-intro';
import screenStory from './modules/screen-story';
import screenPrizes from './modules/screen-prizes';
import screenRules from './modules/screen-rules';
import screenGame from './modules/screen-game';

// init modules
screenIntro();
screenPrizes();
screenRules();
screenGame();
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
screenStory();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

window.addEventListener(`load`, () => {
  document.body.classList.add(`loaded`);
});
