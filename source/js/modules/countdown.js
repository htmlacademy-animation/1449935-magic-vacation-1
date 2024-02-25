export class Countdown {
  constructor(duration) {
    this._stopped = true;
    this._startTime = 0;
    this._prevUpdateTime = 0;
    this._duration = duration;
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
   * @param {number} remainingTime осталось с момента запуска отсчета
   * @param {number} elapsedTime прошло с момента запуска отсчета
   */
  // eslint-disable-next-line no-unused-vars
  onUpdate(remainingTime, elapsedTime) {
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
    const prevTickElapsedTime = now - this._prevUpdateTime;

    const remainingTime = Math.max(this._duration - elapsedTime, 0);

    if (elapsedTime < this._duration) {
      requestAnimationFrame(this._tick);
    } else {
      if (this.onUpdate) {
        this.onUpdate(remainingTime, elapsedTime);
      }

      this.stop();
      this.onFinish();
    }

    if (prevTickElapsedTime >= 1000) {
      this._prevUpdateTime = now;

      if (this.onUpdate) {
        this.onUpdate(remainingTime, elapsedTime);
      }
    }
  }
}
