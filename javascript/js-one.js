'use strict'

! function func() {
    const scrollBtn = document.querySelector('.scroll-up');
    const orderBtns = document.querySelectorAll('.options button');
    const orderForm = document.forms.order;
    const formClose = orderForm.querySelector('.close-btn');



    //responsive menu function
    let responseMenu = () => {
        let menuBtn = document.querySelector('.menu');
        let responseNav = menuBtn.parentElement.querySelector('.navbar');
        menuBtn.onclick = () => {
            responseNav.classList.toggle('active');
            menuBtn.classList.toggle('active');
        }
    }

    // slider funtion
    let slider = () => {
        let slideContiner = document.querySelector('.slider-container'),
            slideWraper = slideContiner.firstElementChild,
            sliders = slideWraper.querySelectorAll('.slide'),
            pagination = slideContiner.querySelector('.pagination'),
            currentImage = 0;


        slideWraper.style.width = `${slideContiner.clientWidth*sliders.length}px`;
        for (let elem of sliders) {
            elem.style.width = slideContiner.clientWidth + 'px';
        }

        pagination.addEventListener('click', function (e) {
            let target = e.target;
            if (target.classList != 'pagination-elem') return;
            currentImage = target.dataset.index;
            pringCurrentSlide();
        })

        createPagination(currentImage);
        scrollSlide();

        function scrollSlide() {
            let clickStart, current;
            slideWraper.onmousedown = (e) => {
                e.preventDefault();
                clickStart = e.pageX;
                slideWraper.onmouseup = (e) => {
                    e.preventDefault();
                    current = clickStart - e.pageX;
                    if (current > 0) {
                        currentImage++;
                        pringCurrentSlide()
                    } else if (current == 0) return;
                    else {
                        if (currentImage == 0) currentImage = sliders.length;
                        currentImage--;
                        pringCurrentSlide();
                    }
                }
            }
            slideWraper.ontouchstart = (e) => {
                e.preventDefault();
                clickStart = e.touches[0].pageX;
                slideContiner.ontouchmove = (e) => {
                    e.preventDefault();

                    current = clickStart - e.touches[0].pageX;
                }
                slideWraper.ontouchend = () => {
                    if (current > 0) {
                        currentImage++;
                        pringCurrentSlide()
                    } else if (current == 0) return;
                    else {
                        if (currentImage == 0) currentImage = sliders.length;
                        currentImage--;
                        pringCurrentSlide();
                    }
                }
            }
        }


        function pringCurrentSlide() {
            slideWraper.style.left = `-${sliders[currentImage % sliders.length].offsetLeft}px`;
            createPagination(currentImage % sliders.length);
            console.log(currentImage);
        }

        function createPagination(num) {
            pagination.innerHTML = '';
            sliders.forEach((elem, index) => {
                if (num == index) {
                    pagination.innerHTML += `<div class="pagination-elem active" data-index=${index}></div>`;
                } else {
                    pagination.innerHTML += `<div class="pagination-elem" data-index=${index}></div>`
                }
            })
        }
    }

    // scroll page up function

    function scrollUp() {
        scrollBtn.onclick = () => {
            let height = window.scrollY;
            animate({
                duration: 1000,
                timing: (timeFraction) => {
                    return timeFraction;
                },
                draw: (progress) => {
                    let height1 = height - height * progress;
                    window.scrollTo(0, height1);
                }
            })
        }

    }

    function animate(options) {
        let start = performance.now();
        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / options.duration;
            if (timeFraction > 1) timeFraction = 1;
            let progress = options.timing(timeFraction);
            options.draw(progress);
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        })
    }

    function scroll() {
        if (document.documentElement.scrollTop > window.innerHeight && scrollBtn.classList.contains('disactive')) {
            scrollBtn.classList.toggle('disactive');
            return;
        }
        if (document.documentElement.scrollTop < window.innerHeight && !scrollBtn.classList.contains('disactive')) {
            scrollBtn.classList.toggle('disactive');
        }
    }
    window.addEventListener('scroll', scroll);

    //show || close order menu

    function showForm() {
        let orderForm = document.forms.order;
        orderForm.classList.toggle('disactive');
    }

    function close() {
        if (this.parentElement.tagName == 'FORM') {
            let errors = this.parentElement.querySelectorAll('.form-error');
            if (errors !== undefined) {
                errors.forEach((elem) => {
                    elem.remove();
                })
            }
            for (let el of this.parentElement.elements) {
                if (el.name == 'submit') {
                    el.value = el.value;
                } else {
                    el.value = '';
                }
            }
        }
        this.parentElement.classList.toggle('disactive');
    }

    function validateForm(e) {
        e.preventDefault();
        let inputs = this.elements;
        for (let el of inputs) {
            if (!checkText(el.name, el.value)) {
                let span = document.createElement('span');
                span.classList.add('form-error');
                span.innerHTML = 'Incorrect text';
                el.parentElement.appendChild(span);
            }
        }
        let status = [...inputs].every((elem) => {
           return checkText(elem.name, elem.value);
         
        })
        if (status) {
            alert('Thanks we call you soon.')
            this.classList.toggle('disactive');
        }
    }

    function checkText(name, string) {
        switch (name) {
            case 'firstname':
            case 'secondname':
                return /^[A-ZА-Я]?[a-zа-я]+$/g.test(string);
            case 'e-mail':
                return /^\w*[._-]?\w*[._-]?[._-]?\w*[._-]?@\w+\.\w{2,5}/g.test(string);
            case 'phone':
                return /^(:?\+3)?8?\s?\(?\d{3}\)?\s?\d{2}[\s-]?\d{2}[\s-]?\d{3}$/g.test(string);
            case 'submit':
                return true;
        }
    }
    for (let el of orderBtns) {
        el.addEventListener('click', () => {
            showForm();
        })
    }
    orderForm.addEventListener('submit', validateForm)
    formClose.addEventListener('click', close)
    scrollUp();
    slider();
    responseMenu();
}();