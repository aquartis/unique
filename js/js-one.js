'use strict';

!function func() {
  var scrollBtn = document.querySelector('.scroll-up');
  var orderBtns = document.querySelectorAll('.options button');
  var formClose = document.forms.order.querySelector('.close-btn'); //responsive menu function

  var responseMenu = function responseMenu() {
    var menuBtn = document.querySelector('.menu');
    var responseNav = menuBtn.parentElement.querySelector('.navbar');

    menuBtn.onclick = function () {
      responseNav.classList.toggle('active');
      menuBtn.classList.toggle('active');
    };
  }; // slider funtion


  var slider = function slider() {
    var slideContiner = document.querySelector('.slider-container'),
        slideWraper = slideContiner.firstElementChild,
        sliders = slideWraper.querySelectorAll('.slide'),
        pagination = slideContiner.querySelector('.pagination'),
        currentImage = 0;
    slideWraper.style.width = "".concat(slideContiner.clientWidth * sliders.length, "px");
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = sliders[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var elem = _step.value;
        elem.style.width = slideContiner.clientWidth + 'px';
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    pagination.addEventListener('click', function (e) {
      var target = e.target;
      if (target.classList != 'pagination-elem') return;
      currentImage = target.dataset.index;
      pringCurrentSlide();
    });
    createPagination(currentImage);
    scrollSlide();

    function scrollSlide() {
      var clickStart, current;

      slideWraper.onmousedown = function (e) {
        e.preventDefault();
        clickStart = e.pageX;

        slideWraper.onmouseup = function (e) {
          e.preventDefault();
          current = clickStart - e.pageX;

          if (current > 0) {
            currentImage++;
            pringCurrentSlide();
          } else if (current == 0) return;else {
            if (currentImage == 0) currentImage = sliders.length;
            currentImage--;
            pringCurrentSlide();
          }
        };
      };

      slideWraper.ontouchstart = function (e) {
        e.preventDefault();
        clickStart = e.touches[0].pageX;

        slideContiner.ontouchmove = function (e) {
          e.preventDefault();
          current = clickStart - e.touches[0].pageX;
        };

        slideWraper.ontouchend = function () {
          if (current > 0) {
            currentImage++;
            pringCurrentSlide();
          } else if (current == 0) return;else {
            if (currentImage == 0) currentImage = sliders.length;
            currentImage--;
            pringCurrentSlide();
          }
        };
      };
    }

    function pringCurrentSlide() {
      slideWraper.style.left = "-".concat(sliders[currentImage % sliders.length].offsetLeft, "px");
      createPagination(currentImage % sliders.length);
    }

    function createPagination(num) {
      pagination.innerHTML = '';
      sliders.forEach(function (elem, index) {
        if (num == index) {
          pagination.innerHTML += "<div class=\"pagination-elem active\" data-index=".concat(index, "></div>");
        } else {
          pagination.innerHTML += "<div class=\"pagination-elem\" data-index=".concat(index, "></div>");
        }
      });
    }
  }; // scroll page up function


  function scrollUp() {
    scrollBtn.onclick = function () {
      var height = window.scrollY;
      animate({
        duration: 1000,
        timing: function timing(timeFraction) {
          return timeFraction;
        },
        draw: function draw(progress) {
          var height1 = height - height * progress;
          window.scrollTo(0, height1);
        }
      });
    };
  }

  function animate(options) {
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
      var timeFraction = (time - start) / options.duration;
      if (timeFraction > 1) timeFraction = 1;
      var progress = options.timing(timeFraction);
      options.draw(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
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

  window.addEventListener('scroll', scroll); //show || close order menu

  function showForm() {
    var orderForm = document.forms.order;
    orderForm.classList.toggle('disactive');
  }

  function close() {
    this.parentElement.classList.toggle('disactive');
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = orderBtns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var el = _step2.value;
      el.addEventListener('click', function () {
        showForm();
      });
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  formClose.addEventListener('click', close);
  scrollUp();
  slider();
  responseMenu();
}();