/**
 * @param {Element} letter
 * @param {string} masterAnimationId
 * @param {*} options
 */
export const initLetterPathAnimation = (letter, masterAnimationId, options) => {
  const {duration, delay, segments} = options;

  const animationSegments = segments || 3;

  const pathLength = letter.getTotalLength();
  const segmentLength = pathLength / animationSegments;
  letter.style[`stroke-dasharray`] = pathLength;
  letter.style[`stroke-dashoffset`] = pathLength;
  const delayString = delay ? `+${delay}` : ``;

  letter.innerHTML = `
    <animate
      attributeName="stroke-dashoffset"
      from="0"
      to="${segmentLength}"
      dur="${duration}"
      begin="${masterAnimationId}.begin${delayString}"
      fill="freeze"
    />
    <animate
      attributeName="stroke-dasharray"
      from="0 ${segmentLength}"
      to="${segmentLength} 0"
      dur="${duration}"
      begin="${masterAnimationId}.begin${delayString}"
      fill="freeze"
    />
  `;
};

/**
 * @param {Element} root root element
 * @param {string} animationId
 * @param {*} options
 */
export const initGameWinTitleAnimation = (root, animationId, options) => {
  const {animationDuration, animationClass} = options;

  const zoomAnimation = `
    <animateTransform
      id="${animationId}"
      class=${animationClass}
      attributeName="transform" type="scale" values="1.2 1.2; 1 1"
      dur="${animationDuration}"
      begin="indefinite"
    />
  `;

  root.insertAdjacentHTML(`afterbegin`, zoomAnimation);

  const letters = root.querySelectorAll(`path`);

  letters.forEach((letter) => {
    initLetterPathAnimation(letter, animationId, {
      duration: animationDuration,
    });
  });
};

/**
 * @param {Element} root root element
 * @param {string} animationId
 * @param {*} options
 */
export const initGameLooseTitleAnimation = (root, animationId, options) => {
  const {animationDuration, animationClass, stepsDelay} = options;

  const masterAnimation = `
    <animate
      id="${animationId}"
      class=${animationClass}
      dur="${animationDuration}"
      begin="indefinite"
    />
  `;

  root.insertAdjacentHTML(`afterbegin`, masterAnimation);

  const letters = root.querySelectorAll(`path`);

  letters.forEach((letter, i) => {
    const delayVal = i * stepsDelay;

    initLetterPathAnimation(letter, animationId, {
      duration: animationDuration,
      delay: `${delayVal}s`
    });

    const fallAnimation = `
      <animateTransform
        attributeName="transform"
        values="
          -2.16 0;
          -2.16 109.24;
          -2.16 100;
          -2.16 109.24;
        "
        begin="${animationId}.begin+${delayVal}s"
        dur="${animationDuration}"
        keyTimes="
          0;
          0.66;
          0.83;
          1
        "
        calcMode="spline"
        keySplines="
          0.32 0 0.67 0;
          0.27 0.9 0.82 1;
          0.27 0.1 1 0.82;
        "
        fill="freeze"
      />
    `;

    letter.insertAdjacentHTML(`beforeend`, fallAnimation);
  });
};
