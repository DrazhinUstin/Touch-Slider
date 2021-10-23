const setupSlider = () => {

    const sliderWrapper = document.querySelector('.slider-wrapper');
    const sliderBtns = document.querySelectorAll('.slider-controllers > *');
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const images = [...document.querySelectorAll('.slide img')];

    let initX = 0;
    let currentX = 0;
    let xDiff = 0;
    let initTranslate = 0;
    let currentTranslate = 0;
    let slideStep = 0;
    let animationId;

    const startSwipe = (event) => {
        initX = event.touches[0].clientX;
        animationId = requestAnimationFrame(animate);
    };

    const moveSwipe = event => {
        currentX = event.touches[0].clientX;
        xDiff = currentX - initX;
        currentTranslate = xDiff + initTranslate;
    };

    const endSwipe = () => {
        cancelAnimationFrame(animationId);
        if (xDiff < -100) slideStep++;
        if (xDiff > 100) slideStep--;
        xDiff = 0;
        switchSlide();
    };

    const animate = () => {
        displayTransform();
        requestAnimationFrame(animate);
    };

    const displayTransform = () => {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    };

    const switchSlide = () => {
        if (slideStep > slides.length - 1) slideStep = 0;
        if (slideStep < 0) slideStep = slides.length - 1;
        currentTranslate = slideStep * -slider.offsetWidth;
        initTranslate = currentTranslate;
        displayTransform();
    };

    sliderWrapper.addEventListener('touchstart', event => startSwipe(event));
    sliderWrapper.addEventListener('touchmove', event => moveSwipe(event));
    sliderWrapper.addEventListener('touchend', endSwipe);

    sliderBtns[0].addEventListener('click', () => {
        slideStep--;
        switchSlide();
    });

    sliderBtns[1].addEventListener('click', () => {
        slideStep++;
        switchSlide();
    });

    images.forEach(image => image.addEventListener('dragstart', event => event.preventDefault()));

    window.addEventListener('resize', switchSlide);

};

setupSlider();
