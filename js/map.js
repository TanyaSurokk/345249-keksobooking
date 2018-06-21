'use strict';
// Блок работы с картой - изначальное состояние, перемещение главной метки, сброс

(function () {
  var MAIN_PIN_MIN_X = 0;
  var INITIAL_MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_WIDTH = 65;
  var ACTIVE_MAIN_PIN_HEIGHT = 77;

  // Находим необходимые элементы
  var mapElement = document.querySelector('.map');
  var mainPin = mapElement.querySelector('.map__pin--main');
  window.mainPinInactiveY = mainPin.offsetTop;
  window.mainPinInactiveX = mainPin.offsetLeft;

  // Функция установки изначального состояния страницы
  var setInitialPage = function () {
    window.form.disableForm();
    window.form.setAddress(MAIN_PIN_WIDTH, INITIAL_MAIN_PIN_HEIGHT / 2, mainPin);
    mainPin.addEventListener('mouseup', mainPinMouseupHandler);
    window.pageActivated = false;
  };

  setInitialPage();

  // Функция оживления карты
  var activateMap = function () {
    mapElement.classList.remove('map--faded');
  };

  // Обработчик события для главной метки
  var mainPinMouseupHandler = function () {
    activateMap();
    window.form.activateForm();
    window.pin.renderMapPinsList();
    window.form.setAddress(MAIN_PIN_WIDTH, ACTIVE_MAIN_PIN_HEIGHT, mainPin);
    mainPin.removeEventListener('mouseup', mainPinMouseupHandler);
    window.pageActivated = true;
  };

  // Функция сброса карты в первоначальное состояние
  var resetMap = function () {
    window.card.closeMapCard();
    mapElement.classList.add('map--faded');
    mainPin.style.left = window.mainPinInactiveX + 'px';
    mainPin.style.top = window.mainPinInactiveY + 'px';
    window.pin.removeMapPins();
  };

  // Перетаскивание главной метки
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (!window.pageActivated) {
        mainPinMouseupHandler();
      }

      window.form.setAddress(MAIN_PIN_WIDTH, ACTIVE_MAIN_PIN_HEIGHT, mainPin);

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoordsX = mainPin.offsetLeft - shift.x;
      var newCoordsY = mainPin.offsetTop - shift.y;

      var minCoords = {
        x: Math.floor(MAIN_PIN_MIN_X - MAIN_PIN_WIDTH / 2),
        y: window.data.LOCATION_MIN_Y - ACTIVE_MAIN_PIN_HEIGHT
      };

      var maxCoords = {
        x: Math.floor(mainPin.parentElement.offsetWidth - MAIN_PIN_WIDTH / 2),
        y: window.data.LOCATION_MAX_Y - ACTIVE_MAIN_PIN_HEIGHT
      };

      if (newCoordsY < minCoords.y) {
        newCoordsY = minCoords.y;
      }

      if (newCoordsY > maxCoords.y) {
        newCoordsY = maxCoords.y;
      }

      if (newCoordsX < minCoords.x) {
        newCoordsX = minCoords.x;
      }

      if (newCoordsX > maxCoords.x) {
        newCoordsX = maxCoords.x;
      }

      mainPin.style.top = newCoordsY + 'px';
      mainPin.style.left = newCoordsX + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (!window.pageActivated) {
        mainPinMouseupHandler();
      }

      window.form.setAddress(MAIN_PIN_WIDTH, ACTIVE_MAIN_PIN_HEIGHT, mainPin);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    mapElement: mapElement,
    resetMap: resetMap,
    setInitialPage: setInitialPage
  };
})();
