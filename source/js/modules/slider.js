import Swiper from "swiper";

export default () => {
  let storySlider;
  let sliderContainer = document.getElementById(`story`);
  sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;

  const cssRoot = document.querySelector(`:root`);

  const updateControlsStyles = () => {
    if (storySlider.activeIndex === 0) {
      cssRoot.style.setProperty(`--slider-prev-control-opacity`, `0.5`);
      cssRoot.style.setProperty(`--slider-next-control-opacity`, `1`);
    } else if (storySlider.isEnd) {
      cssRoot.style.setProperty(`--slider-prev-control-opacity`, `1`);
      cssRoot.style.setProperty(`--slider-next-control-opacity`, `0.5`);
    } else {
      cssRoot.style.setProperty(`--slider-prev-control-opacity`, `1`);
      cssRoot.style.setProperty(`--slider-next-control-opacity`, `1`);
    }
  };

  const clearSliderThemes = () => {
    document.body.classList.remove(`theme-purple`);
    document.body.classList.remove(`theme-blue`);
    document.body.classList.remove(`theme-cyan`);
  };

  const updateTheme = () => {
    const slideNumber = Math.floor(storySlider.activeIndex / 2);

    clearSliderThemes();

    switch (slideNumber) {
      case 0:
        document.body.classList.add(`theme-purple`);
        break;
      case 1:
        document.body.classList.add(`theme-blue`);
        break;
      case 2:
        document.body.classList.add(`theme-cyan`);
        break;
      case 3:
        document.body.classList.add(`theme-purple`);
        break;
    }
  };

  document.body.addEventListener(`screenChanged`, (evt) => {
    if (evt.detail.screenName !== `story`) {
      clearSliderThemes();
    } else {
      updateTheme();
    }
  });

  const setSlider = function () {
    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
              sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              sliderContainer.style.backgroundImage = `url("img/slide2.jpg"), linear-gradient(180deg, rgba(45, 54, 179, 0) 0%, #2A34B0 16.85%)`;
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              sliderContainer.style.backgroundImage = `url("img/slide3.jpg"), linear-gradient(180deg, rgba(92, 138, 198, 0) 0%, #5183C4 16.85%)`;
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              sliderContainer.style.backgroundImage = `url("img/slide4.jpg"), linear-gradient(180deg, rgba(45, 39, 63, 0) 0%, #2F2A42 16.85%)`;
            }

            updateControlsStyles();
            updateTheme();
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0) {
              sliderContainer.style.backgroundImage = `url("img/slide1.jpg")`;
            } else if (storySlider.activeIndex === 2) {
              sliderContainer.style.backgroundImage = `url("img/slide2.jpg")`;
            } else if (storySlider.activeIndex === 4) {
              sliderContainer.style.backgroundImage = `url("img/slide3.jpg")`;
            } else if (storySlider.activeIndex === 6) {
              sliderContainer.style.backgroundImage = `url("img/slide4.jpg")`;
            }

            updateControlsStyles();
            updateTheme();
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    }

    updateControlsStyles();
    updateTheme();
  };

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  setSlider();
};
