const DELAY_THRESHOLD = 0.5;

export class LetterByLetterAnimation {
  /**
   * @constructor
   * @param {string | HTMLElement} target
   * @param {number} duration the duration of the animation in ms
   * @param {string} classForActivate
   * @param {string} animationProperty
   */
  constructor(target, duration, classForActivate, animationProperty) {
    this._container = typeof target === `string` ? document.querySelector(target) : target;
    this._duration = duration;
    this._classForActivate = classForActivate;
    this._animationProperty = animationProperty;
    this._createLetterElement = this._createLetterElement.bind(this);

    this._init();
  }

  /**
   * @param {string} letter
   * @return {HTMLSpanElement}
   */
  _createLetterElement(letter) {
    const delayMax = this._duration * DELAY_THRESHOLD;
    const delay = Math.floor((delayMax + 1) * Math.random());
    const duration = this._duration - delay;
    const element = document.createElement(`span`);
    element.textContent = letter;
    element.style.transition = `${this._animationProperty} ${duration}ms cubic-bezier(0, 0, 0.25, 1) ${delay}ms`;
    return element;
  }

  /**
   * @param {HTMLElement[]} children
   * @return {HTMLSpanElement}
   */
  _createWordElement(children) {
    const container = document.createElement(`span`);
    container.className = `text__word`;
    children.forEach((it) => container.appendChild(it));
    return container;
  }

  _init() {
    if (!this._container) {
      return;
    }

    const words = this._container.textContent.trim().split(/\s+/);

    const wordElements = words.map((word) => {
      const letters = word.split(``);
      const letterElements = letters.map(this._createLetterElement);

      return this._createWordElement(letterElements);
    });

    const wordElementsFragment = document.createDocumentFragment();

    wordElements.forEach((it) => {
      wordElementsFragment.appendChild(it);
    });

    this._container.innerHTML = ``;
    this._container.appendChild(wordElementsFragment);
  }

  start() {
    if (this._container) {
      this._container.classList.add(this._classForActivate);
    }
  }

  stop() {
    if (this._container) {
      this._container.classList.remove(this._classForActivate);
    }
  }
}
