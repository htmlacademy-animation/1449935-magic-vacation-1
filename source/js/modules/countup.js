export class Countup {
  /**
   * @param {number} from
   * @param {number} to
   * @param {number} duration длительность в мс
   * @param {number} fps кадров/с
   */
  constructor(from, to, duration, fps) {
    this._from = from;
    this._to = to;
    this._duration = duration;

    this._tickInterval = 1000 / fps;

    this._increment = (to - from) / duration; // приращение за 1 мс
    this._prevUpdateTime = 0;
    this._stopped = true;

    this._tick = this._tick.bind(this);
  }

  start() {
    if (this._stopped) {
      this._stopped = false;
      const now = Date.now();
      this._startTime = now;
      this._prevUpdateTime = now;
      requestAnimationFrame(this._tick);
    }
  }

  stop() {
    this._stopped = true;
    this._prevUpdateTime = 0;
  }

  /**
   * Значение
   * @param {number} value
   */
  // eslint-disable-next-line no-unused-vars
  onUpdate(value) {
    // noop
  }

  onFinish() {
    // noop
  }

  _tick() {
    if (this._stopped) {
      return;
    }

    const now = Date.now();
    const elapsedTime = now - this._startTime;

    if (elapsedTime > this._duration) {
      if (this.onUpdate) {
        this.onUpdate(this._to);
      }

      this.stop();
      this.onFinish();
      return;
    }

    const prevUpdateElapsedTime = now - this._prevUpdateTime;

    if (prevUpdateElapsedTime < this._tickInterval) {
      requestAnimationFrame(this._tick);
      return;
    }

    const value = Math.round(this._from + elapsedTime * this._increment);

    if (this.onUpdate) {
      this.onUpdate(value);
    }

    this._prevUpdateTime = now;

    requestAnimationFrame(this._tick);
  }
}
